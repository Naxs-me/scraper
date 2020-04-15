const rp = require('request-promise');
const ch = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/Glossary_of_computer_science';
const get_glossary = function (url) {
    return rp(url)
        .then(function (html) {
            //success!
            console.log(ch('li > b > a', html).length);
            console.log(ch('li > b > a', html)[0].attribs.title);
            let glossary = []
            ch('li > b > a', html).each(function (i, e) {
                glossary[i] = ch(this).html();
            });
            // console.log(glossary);
            return glossary;
        })
        .catch(function (err) {
            //handle error
        });

}
module.exports = get_glossary;
console.log(get_glossary(url));
