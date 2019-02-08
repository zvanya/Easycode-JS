const newsService = new NewsService();
const uiService = new NewsUI();
const queryResultNotice = new NewsUINotice("notice-query-result");

// UI Elements
const form = document.forms['newsControlForm'];
const countrySelect = form['country'];
const categorySelect = form['category'];
const queryFilter = form['search'];

function onSelectChange(event) {
    const country = countrySelect.value;
    const category = categorySelect.value;

    if (!country || !category) return console.error('Введите страну и категорию для поиска');

    newsService.getTopHeadlinesNews(category, country, (response) => {
        const { totalResults, articles } = response;

        // console.time();
        uiService.clearContainer();
        // console.timeEnd();

        // console.time();
        articles.forEach((article) => uiService.addArticleHTML(article));
        // console.timeEnd();
    });
}

/**
 *
 * @param event
 */
function onFilterChange(event) {
    const query = queryFilter.value;
    
    if (!query || query.length < 3) {
        uiService.clearContainer();
        return console.error('Введите строку поиска более 3х символов');
    }
    
    newsService.getQueryFilteredNews(query, (response) => {
        const { totalResults, articles } = response;
        
        if (totalResults === 0) {
            uiService.clearContainer();
            queryResultNotice.generateNotice("orange");
        } else {
            queryResultNotice.removeNotice();
            uiService.clearContainer();
            articles.forEach((article) => uiService.addArticleElement(article));
        }
    });
}

countrySelect.addEventListener('change', onSelectChange);
categorySelect.addEventListener('change', onSelectChange);
queryFilter.addEventListener('keyup', onFilterChange);
