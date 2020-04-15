const rp = require('request-promise');
const url = 'http://stackoverflow.com/questions/19860327';
const wurl = 'https://en.wikipedia.org/wiki/Glossary_of_computer_science';
const ch = require('cheerio');

var glossary = [];
var ans = [];

rp(wurl)
    .then(function (html) {
        //success!
        // console.log(ch('li > b > a', html).length);
        // console.log(ch('li > b > a', html)[0].attribs.title);
        ch('li > b > a', html).each(function (i, e) {
            glossary[i] = ch(this).html();
        })
            .then(rp(url).then(function (html) {
                // console.log(ch('.post-text > p', html).length);
                // console.log("hello")
                // console.log(ch('.post-text > p',html).next().html());
                ch('.post-text > p', html).each(function (i, e) {
                    ans[i] = ch(this).html();
                });
                // console.log(ans);
            }).then(function () {
                console.log(glossary);
                console.log(ans);
            }));
        // console.log(glossary);
    })
    // .then(rp(url))
    // .then(function(html){
    //     let ans = []
    //     console.log(ch('.post-text > p',html).length);
    //     // console.log("hello")
    //     // console.log(ch('.post-text > p',html).next().html());
    //     ch('.post-text > p',html).each(function(i,e){
    //         ans[i] = ch(this).html();
    //     });
    //     console.log(ans);
    // })
    .catch(function (err) {
        //handle error
    });

// console.log(glossary);

// rp(url).then(function(html){
//     let ans = []
//     console.log(ch('.post-text > p',html).length);
//     // console.log("hello")
//     // console.log(ch('.post-text > p',html).next().html());
//     ch('.post-text > p',html).each(function(i,e){
//         ans[i] = ch(this).html();
//     });
//     console.log(ans);
// })
// .catch(function(err){
//     console.log("error");
// });