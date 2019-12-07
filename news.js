let axions = require('axios');
let cheerio = require('cheerio');
const ejs = require("ejs")
let fs = require('fs');
const express = require("express")

const app = express()

app.set('view engine','ejs')

// var detik = "detik"

// app.get("/",(req,res)=>{

//     res.render("index",{
//         halo : detik
//     })
    
// })

//scrapping detik
app.get("/api/scrape/detik",(req,res)=>{
    axions.get('https://detik.com/')
    .then((response)=> {
        if(response.status === 200){
            const html = response.data;
            const $ = cheerio.load(html);
            let detikList = [];
            $('.m_content li').each(function(i,elm){
                detikList[i] = {
                    judul: $(this).find('h2').text().trim(),
                    url: $(this).find('a').attr('href'),
                    publised: $(this).find('.labdate').text().trim()
                }
            });
            // const detikListTrim = detikList.filter(n => n != undefined)
            // fs.writeFile('data/detikList.json',
            //     JSON.stringify(detikListTrim, null, 4),(err) => {
            //         console.log('Write Scrapping is Success')
            //     });
            res.render("detik",{
                title: "scraping",
                detiks: detikList,
                footer:"copyright 2019"
            })
        }
    }), (error) => console.log(err);

})

//scrapping tribun
app.get("/api/scrape/tribun",(req,res)=>{
    axions.get('https://www.tribunnews.com/')
    .then((response)=> {
        if(response.status === 200){
            const html = response.data;
            const $ = cheerio.load(html);
            let tribunList = [];
            $('.lsi li.art-list').each(function(i,elm){
                tribunList[i] = {
                    judul: $(this).find('h3').text().trim(),
                    url: $(this).find('a').attr('href'),
                    publised: $(this).find('time').attr('title'),
                    kategori: $(this).find('span > a.fbo2.tsa-2').attr('title')
                }
            });
            
            res.render("tribun",{
                title: "scraping",
                tribuns: tribunList,
                footer:"copyright 2019"
            })
        }
    }), (error) => console.log(err);
})

//scrapping kompas
app.get("/api/scrape/kompas",(req,res)=>{
    axions.get('https://www.kompas.com/')
    .then((response)=> {
        if(response.status === 200){
            const html = response.data;
            const $ = cheerio.load(html);
            let kompasList = [];
            $('.col-bs10-7 > div.latest > div.article__list').each(function(i,elm){
                kompasList[i] = {
                    judul: $(this).find('h3.article__title > a.article__link').text().trim(),
                    url: $(this).find('a.article__link').attr('href'),
                    publised: $(this).find('.article__date').text().trim(),
                    kategori: $(this).find('.article__subtitle').text().trim()  
                }
            });
            
            res.render("kompas",{
                title: "scraping",
                kompas: kompasList,
                footer:"copyright 2019"
            })
        }
    }), (error) => console.log(err);
})

//halaman utama
app.get("/api/scrape/",(req,res)=>{
            res.render("index");
})

//fitur pencarian

// port
app.listen(3000,()=>{
    console.log("running at port 3000");
    
})

    // app.get("/api/scrape/content",(req,res)=>{
    //     axions.get('https://news.detik.com/berita-jawa-tengah/d-4812379/diminta-ganjar-untuk-banyak-ngobrol-dengan-fx-rudy-apa-jawab-gibran')
    //     .then((response)=> {
    //         if(response.status === 200){
    //             const html = response.data;
    //             const $ = cheerio.load(html);
    //             let content = [];
    //             $('article div').each(function(i,elm){
    //                 content[i] = {
    //                     date: $(this).find('.jdl .date').text().trim(),
    //                     judul: $(this).find('.jdl h1').text().trim(),
    //                     author: $(this).find('.jdl .author').text().trim(),
    //                     image: $(this).find('.pic_artikel > img').attr('src'),
    //                     image_ket: $(this).find('.pic_artikel > span').text().trim(),
    //                     detail_text: $(this).find('#detikdetailtext').text().trim(),

    //                 }
    //             });
    //             // const contentTrim = content.filter(n => n != undefined)
    //             // fs.writeFile('data/content.json',
    //             //     JSON.stringify(contentTrim, null, 4),(err) => {
    //             //         console.log('Write Scrapping is Success')
    //             //     });
    //             res.render("index dewi",{
    //                 title: "content",
    //                 contents: content,
    //                 footer:"copyright 2019"
    //             })
    //         }
    //     }), (error) => console.log(err);
    
    
    // })
    