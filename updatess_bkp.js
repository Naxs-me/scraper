const rp = require('request-promise');
const opn = require('opn');
const url = 'https://stackoverflow.com/questions/824234/what-is-a-callback-function';
const wurl = 'https://en.wikipedia.org/wiki/Glossary_of_computer_science';
const ch = require('cheerio');

var glossary = [];
var link = [];
var ans = [];

rp(wurl)
    .then(function (html) {
        ch('li > b > a', html).each(function (i, e) {
            glossary[i] = ch(this).html();
            link[i] = ch(this);
        })
            .then(rp(url).then(function (html) {
                ch('.post-text > p', html).each(function (i, e) {
                    ans[i] = ch(this).html();
                });
            }).then(function () {
                // console.log(glossary[279]);
                for(let i = 0; i < 5; i++){
                    glossary.pop();
                }
                for(let i = 0; i < glossary.length;i++){
                    console.log(glossary[i]);
                }
                console.log(ans);
                console.log(link[1]['0']['attribs']['href']);
                let query = ans.join();
                console.log(query);
                for(let i = 0; i < glossary.length;i++){
                    if(query.includes(glossary[i]) == true){
                        console.log(glossary[i]);
                        console.log(i);
                        console.log(link[i]['0']['attribs']['href']);
                        opn("https://en.wikipedia.org/"+link[i]['0']['attribs']['href']);
                    }
                }
            }));
    })
    .catch(function (err) {
        console.log("");
    });