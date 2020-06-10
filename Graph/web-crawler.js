/*
Given a url startUrl and an interface HtmlParser, implement a web crawler to crawl all links that are under the same hostname as startUrl. 

Return all urls obtained by your web crawler in any order.

Your crawler should:

Start from the page: startUrl
Call HtmlParser.getUrls(url) to get all urls from a webpage of given url.
Do not crawl the same link twice.
Explore only the links that are under the same hostname as startUrl.

As shown in the example url above, the hostname is example.org. For simplicity sake, you may assume all urls use http protocol without any port specified. For example, the urls http://leetcode.com/problems and http://leetcode.com/contest are under the same hostname, while urls http://example.org/test and http://example.com/abc are not under the same hostname.

The HtmlParser interface is defined as such: 

interface HtmlParser {
  // Return a list of all urls from a webpage of given url.
  public List<String> getUrls(String url);
}
Below are two examples explaining the functionality of the problem, for custom testing purposes you'll have three variables urls, edges and startUrl. Notice that you will only have access to startUrl in your code, while urls and edges are not directly accessible to you in code.
Input:
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com",
  "http://news.yahoo.com/us"
]
edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]
startUrl = "http://news.yahoo.com/news/topics/"
Output: [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.yahoo.com/us"
]

Input: 
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com"
]
edges = [[0,2],[2,1],[3,2],[3,1],[3,0]]
startUrl = "http://news.google.com"
Output: ["http://news.google.com"]
Explanation: The startUrl links to all other pages that do not share the same hostname.

Constraints:

1 <= urls.length <= 1000
1 <= urls[i].length <= 300
startUrl is one of the urls.
Hostname label must be from 1 to 63 characters long, including the dots, may contain only the ASCII letters from 'a' to 'z', digits  from '0' to '9' and the hyphen-minus character ('-').
The hostname may not start or end with the hyphen-minus character ('-'). 
See:  https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_hostnames
You may assume there're no duplicates in url library.

Source: https://leetcode.com/problems/web-crawler/
 */
/**
 * // This is the HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * function HtmlParser() {
 *
 *		@param {string} url
 *     	@return {string[]}
 *     	this.getUrls = function(url) {
 *      	...
 *     	};
 * };
 */

/**
 * @param {string} startUrl
 * @param {HtmlParser} htmlParser
 * @return {string[]}
*/
var crawl = function(startUrl, htmlParser) {
    const queue = [];
    const visited = new Set();
    const crawledUrls = [];
    crawledUrls.push(startUrl);
    visited.add(startUrl)
    queue.unshift(startUrl);
    while(queue.length !== 0) {
        const url = queue.shift();
        // get urls referred in this url
        const linkedUrls = htmlParser.getUrls(url);
       // console.log(url,linkedUrls);
        for(let i=0;i<linkedUrls.length;i++){
            const linkedUrl = linkedUrls[i];
            if(visited.has(linkedUrl)){
                continue;
            }
            
            visited.add(linkedUrl);
            // add only if this belongs to the same hostname
            if(hasSameHostname(url,linkedUrl)){
                queue.unshift(linkedUrl)
                crawledUrls.push(linkedUrl)
            }
        }
    }
    return crawledUrls;
};

function hasSameHostname(parentUrl, linkedUrl){
    const parentHostname = getHostname(parentUrl);
    const linkedHostname = getHostname(linkedUrl);
    return parentHostname === linkedHostname;
}

function getHostname(url){
    // extract hostname for each passed url. Since all urls use http://,
    const host = url.substring(7);
    // find the first '/'
    const index = host.indexOf('/');
    return index !== -1 ? host.substring(0,index) : host;

}

console.log(crawl(["http://news.yahoo.com","http://news.yahoo.com/news","http://news.yahoo.com/news/topics/","http://news.google.com","http://news.yahoo.com/us"],
[[2,0],[2,1],[3,2],[3,1],[0,4]],
"http://news.yahoo.com/news/topics/"))