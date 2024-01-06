Vue.config.devtools = true
const { createApp } = Vue

createApp({
    data() {
        return {
            favPublisherList: [
                '岩波書店',
                '戎光祥出版',
                '河出書房新社',
                '講談社',
                '思文閣出版',
                '昭和堂',
                '筑摩書房',
                '中央公論新社',
                '東京大学出版会',
                '平凡社',
                '勉誠出版',
                'ミネルヴァ書房',
                '山川出版社',
                '雄山閣',
                '吉川弘文館',
                'KADOKAWA'
            ],
            sizeList: [
                {id: '0', name: '全て'},
                {id: '1', name: '単行本'},
                {id: '2', name: '文庫本'},
                {id: '3', name: '新書'},
                {id: '4', name: '全集'},
                {id: '5', name: '事典'},
                {id: '6', name: '図鑑'},
                {id: '7', name: '絵本'},
                {id: '9', name: 'コミック'},
                {id: '10', name: 'ムック'}
            ],
            genreList: [
                {id: '001001', name: '漫画（コミック）'},
                {id: '001002', name: '語学・学習参考書'},
                {id: '001003', name: '絵本・児童書・図鑑'},
                {id: '001004', name: '小説・エッセイ'},
                {id: '001005', name: 'パソコン・システム開発'},
                {id: '001006', name: 'ビジネス・経済・就職'},
                {id: '001007', name: '旅行・留学・アウトドア'},
                {id: '001008', name: '人文・思想・社会'},
                {id: '001009', name: 'ホビー・スポーツ・美術'},
                {id: '001010', name: '美容・暮らし・健康・料理'},
                {id: '001011', name: 'エンタメ・ゲーム'},
                {id: '001012', name: '科学・技術'},
                {id: '001013', name: '写真集・タレント'},
                {id: '001016', name: '資格・検定'},
                {id: '001017', name: 'ライトノベル'},
                {id: '001019', name: '文庫'},
                {id: '001020', name: '新書'},
                {id: '001028', name: '医学・薬学・看護学・歯科学'}
            ],
            inputKeyword: "",
            inputTitle: "",
            inputAuthor: "",
            inputPublisherName: "",
            selectedSize: "",
            selectedGenre: "",
            hits: "",
            initialFlg: true,
            searchEndFlg: false,
            bookInfoList: []
        }
    },
    methods: {
        async simpleSearch() {
            this.searchEndFlg = false;
            this.initialFlg = false;

            const baseUri = 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?';
            const params = filterNullProperties( {
                applicationId: '1019703455578744279',
                format: 'json',
                sort: '-releaseDate',
                title: this.inputKeyword
            });

            const uri = baseUri + (new URLSearchParams(params)).toString();
            const response = await fetch(uri);
            const data = await response.json();
            const bookInfo = data.Items;
            let array = new Array(data.hits);
            this.hits = data.hits;

            for (let i = 0; i < data.hits; i++) {
                let map = {
                    title: bookInfo[i].Item.title,
                    subTitle: bookInfo[i].Item.subTitle,
                    viewTitle: formatViewTitle(bookInfo[i].Item.title),
                    author: formatAuthor(bookInfo[i].Item.author),
                    viewAuthor: formatviewAuthor(bookInfo[i].Item.author),
                    publisherName: bookInfo[i].Item.publisherName,
                    seriesName: bookInfo[i].Item.seriesName,
                    salesDate: formatSalesDate(bookInfo[i].Item.salesDate),
                    itemPrice: formatItemPrice(bookInfo[i].Item.itemPrice),
                    itemCaption: bookInfo[i].Item.itemCaption,
                    itemUrl: bookInfo[i].Item.itemUrl,
                    largeImageUrl: bookInfo[i].Item.largeImageUrl,
                    modalLargeImageUrl: formatLargeImageUrl(bookInfo[i].Item.largeImageUrl)
                };
                array[i] = map;
                

            }
            this.bookInfoList = array;
            this.searchEndFlg = true;
        },
        async advancedSearch() {
            this.initialFlg = false;
            this.searchEndFlg = false;

            const baseUri = 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?';
            const params = filterNullProperties( {
                applicationId: '1019703455578744279',
                format: 'json',
                sort: '-releaseDate',
                title: this.inputTitle,
                author: this.inputAuthor,
                publisherName: this.inputPublisherName,
                size: this.selectedSize,
                booksGenreId: this.selectedGenre
            });

            const uri = baseUri + (new URLSearchParams(params)).toString();
            const response = await fetch(uri);
            const data = await response.json();
            const bookInfo = data.Items;
            let array = new Array(data.hits);
            this.hits = data.hits;

            for (let i = 0; i < data.hits; i++) {
                let map = {
                    title: bookInfo[i].Item.title,
                    subTitle: bookInfo[i].Item.subTitle,
                    viewTitle: formatViewTitle(bookInfo[i].Item.title),
                    author: formatAuthor(bookInfo[i].Item.author),
                    viewAuthor: formatviewAuthor(bookInfo[i].Item.author),
                    publisherName: bookInfo[i].Item.publisherName,
                    seriesName: bookInfo[i].Item.seriesName,
                    salesDate: formatSalesDate(bookInfo[i].Item.salesDate),
                    itemPrice: formatItemPrice(bookInfo[i].Item.itemPrice),
                    itemCaption: bookInfo[i].Item.itemCaption,
                    itemUrl: bookInfo[i].Item.itemUrl,
                    largeImageUrl: bookInfo[i].Item.largeImageUrl,
                    modalLargeImageUrl: formatLargeImageUrl(bookInfo[i].Item.largeImageUrl)
                };
                array[i] = map;
            }
            this.bookInfoList = array;
            this.searchEndFlg = true;
        },
        openModal(index) {
            const modal = document.querySelector('.js-modal-' + index.toString());
            modal.classList.add('is-active');
        },
        closeModal(index) {
            const modal = document.querySelector('.js-modal-' + index.toString());
            modal.classList.remove('is-active');
        },
        clearForm() {
            this.inputKeyword = '';
            this.inputTitle = '';
            this.inputAuthor = '';
            this.inputPublisherName = '';
            this.selectedSize = '';
            this.selectedGenre = '';
            this.bookInfoList = [];
            this.initialFlg = true;
        }
    }
}).mount('#app')

function filterNullProperties(obj) {
    return Object.keys(obj).reduce(
        (retObj, key) =>
            (!obj[key])
                ? retObj
                : Object.assign(retObj, { [key]: obj[key] })
        , {});
}

function formatViewTitle(title) {
    if (title.length >= 18) {
        title = title.substring(0, 18) + '...';
    }

    return title;
}

function formatAuthor(author) {
    author = author.replace(/\s|　/g, '');

    return author;
}

function formatviewAuthor(author) {
    author = author.replace(/\s|　/g, '');

    if (author.length >= 18) {
        author = author.substring(0, 18) + '...'
    }

    return author;
}

function formatSalesDate(salesDate) {
    salesDate = salesDate.replace('頃', '');

    if (salesDate.length === 8) {
        salesDate = salesDate + "01日";
    }

    return salesDate;
}

function formatItemPrice(itemPrice) {
    itemPrice = Number(itemPrice).toLocaleString() + '円';

    return itemPrice;
}

function formatLargeImageUrl(largeImageUrl) {
    largeImageUrl = largeImageUrl.replace('?_ex=200x200', '');

    return largeImageUrl;
}
