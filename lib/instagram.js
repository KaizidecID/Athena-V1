const axios = require('axios');
const cheerio = require('cheerio');
const vm = require('node:vm');

async function indown(url) {
    try {
        const { data: pageData, headers } = await axios.get('https://indown.io/en1', {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const $ = cheerio.load(pageData);

        const token = $('input[name="_token"]').val();

        const cookies = headers['set-cookie']
            ? headers['set-cookie'].map(v => v.split(';')[0]).join('; ')
            : '';

        if (!token) throw new Error('Token tidak ditemukan');

        const params = new URLSearchParams();

        params.append('referer', 'https://indown.io/en1');
        params.append('locale', 'en');
        params.append('_token', token);
        params.append('link', url);
        params.append('p', 'i');

        const { data: resultData } = await axios.post(
            'https://indown.io/download',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookies,
                    'User-Agent': 'Mozilla/5.0'
                }
            }
        );

        const $result = cheerio.load(resultData);

        const resultUrls = [];

        $result('video source[src], a[href].btn-outline-primary').each((i, e) => {

            let link =
                $result(e).attr('src') ||
                $result(e).attr('href');

            if (link) {

                if (link.includes('indown.io/fetch')) {
                    try {
                        link = decodeURIComponent(
                            new URL(link).searchParams.get('url')
                        );
                    } catch {}
                }

                resultUrls.push(link.replace(/&dl=1$/, ''));
            }
        });

        const uniqueUrls = [...new Set(resultUrls)];

        if (uniqueUrls.length === 0) {
            throw new Error('Media tidak ditemukan');
        }

        return {
            status: true,
            source: 'indown',
            result: {
                metadata: {
                    username: '-',
                    caption: '-'
                },
                downloadUrl: uniqueUrls
            }
        };

    } catch (e) {

        return {
            status: false,
            message: e.message
        };
    }
}

async function snapsave(targetUrl) {
    try {

        const form = new URLSearchParams();
        form.append('url', targetUrl);

        const { data } = await axios.post(
            'https://snapsave.app/id/action.php?lang=id',
            form,
            {
                headers: {
                    'origin': 'https://snapsave.app',
                    'referer': 'https://snapsave.app/id/download-video-instagram',
                    'user-agent': 'Mozilla/5.0'
                }
            }
        );

        const ctx = {
            window: {},
            document: {
                getElementById: () => ({ value: '' })
            },
            console: console,
            eval: (res) => res
        };

        vm.createContext(ctx);

        const decoded = vm.runInContext(data, ctx);

        const regex = /https:\/\/d\.rapidcdn\.app\/v2\?[^"]+/g;

        const matches = decoded.match(regex);

        if (matches && matches.length > 0) {

            const cleanUrls = [
                ...new Set(
                    matches.map(url =>
                        url.replace(/&amp;/g, '&')
                    )
                )
            ];

            return {
                status: true,
                source: 'snapsave',
                result: {
                    metadata: {
                        username: '-',
                        caption: '-'
                    },
                    downloadUrl: cleanUrls
                }
            };
        }

        throw new Error('Media tidak ditemukan');

    } catch (e) {

        return {
            status: false,
            message: e.message
        };
    }
}

async function igdl(url) {

    let res = await indown(url);

    if (
        res.status &&
        res.result &&
        res.result.downloadUrl.length > 0
    ) return res;

    res = await snapsave(url);

    return res;
}

module.exports = {
    igdl,
    indown,
    snapsave
};