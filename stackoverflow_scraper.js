const rp = require('request-promise');
const opn = require('opn');
const url = 'https://stackoverflow.com/questions/824234/what-is-a-callback-function';
const mergesort = 'https://stackoverflow.com/questions/19072004/understanding-the-recursion-of-mergesort';
const wurl = 'https://en.wikipedia.org/wiki/Glossary_of_computer_science';
const aurl = 'https://en.wikipedia.org/wiki/List_of_terms_relating_to_algorithms_and_data_structures';
const ch = require('cheerio');

var glossary = [];
var link = [];
var ans = [];
var algo = [];
var algo_html = [];

rp(wurl)
    .then(function (html) {
        ch('li > b > a', html).each(function (i, e) {
            glossary[i] = ch(this).html();
            link[i] = ch(this);
        })
            .then(rp(aurl).then(function (html) {
                ch('li > a', html).each(function (i, e) {
                    algo[i] = ch(this).text();
                    algo_html[i] = ch(this);
                }).then(rp(url).then(function (html) {
                    ch('.post-text > p', html).each(function (i, e) {
                        ans[i] = ch(this).html();
                    });
                }).then(function () {
                    // console.log(glossary[279]);
                    for (let i = 0; i < 5; i++) {
                        glossary.pop();
                    }
                    for(let i = 0; i < 28; i++){
                        algo.shift();
                        algo_html.shift();
                    }
                    // glossary = glossary.concat(algo);
                    // link = link.concat(algo_html);
                    for (let i = 0; i < glossary.length; i++) {
                        console.log(glossary[i]);
                    }
                    console.log(ans);
                    // console.log(algo);
                    console.log(link[1]['0']['attribs']['href']);
                    let query = ans.join();
                    console.log(query);
                    for (let i = 0; i < glossary.length; i++) {
                        if (query.includes(glossary[i]) == true) {
                            console.log(glossary[i]);
                            console.log(i);
                            console.log(link[i]['0']['attribs']['href']);
                            opn("https://en.wikipedia.org/" + link[i]['0']['attribs']['href']);
                        }
                        if (query.includes(algo[i]) == true) {
                            console.log(algo[i]);
                            console.log(i);
                            console.log(algo_html[i]['0']['attribs']['href']);
                            opn("https://en.wikipedia.org/" + algo_html[i]['0']['attribs']['href']);
                        }
                    }
                }));

            }));
    })
    .catch(function (err) {
        console.log("");
    });