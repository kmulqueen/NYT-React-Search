// import axios from "axios";

// export default {
//     // Get all articles
//     getArticles: function() {
//         return axios.get("/api/articles");
//     },
//     // Get article by id
//     getArticle: function(id) {
//         return axios.get("/api/articles/" + id);
//     },
//     // Delete article by id
//     deleteArticle: function(id) {
//         return axios.delete("/api/articles/" + id);
//     },
//     // Save article to db
//     saveArticle: function(articleData) {
//         return axios.post("/api/articles", articleData);
//     }
// };

import axios from "axios";
// import Results from "../components/Results";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const APIKEY = "&api-key=920b87c0829746bc88a1a507e4c2b20d";

export default {
        queryAPI: function (topic, start, end) {

            return axios.get(BASEURL, 
                {params: {
                    APIKEY,
                    "q": topic.search,
                    "begin_date": topic.start + "0101",
                    "end_date": topic.end + "0101"
            }
        })

            .then(function (response) {
                if (response.data.response.docs.length > 0) {
                    const responses = [];
                    // for (let i = 0; i < 5; i++) {
                        const returns = response.data.response.docs;
                        const ArticleID = returns._id;
                        var article = {
                            title: returns.headline.main,
                            url: returns.web.url,
                            date: returns.pub_date,
                            ArticleID: ArticleID
                        };
                        responses.push(article);
                    
                    return article;

                } else {
                    return false
                }
            
            })
        },


        search: function (query) {
            return axios.get(BASEURL + query + APIKEY);
        },
        getArticles: function () {
            return axios.get("/api/articles");
        },
        getArticle: function (id) {
            return axios.get("/api/articles/" + id);
        },
        deleteArticle: function (id) {
            return axios.delete("/api/articles/" + id);
        },
        saveArticle: function (articleData) {
            return axios.post("/api/articles", articleData);
        }
    

}