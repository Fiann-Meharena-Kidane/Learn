const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}


const translateButton=document.querySelector('button');
const fromText=document.querySelector('.from-text')
const toText=document.querySelector('.to-text');
const selectTag=document.querySelectorAll('select');
const exchangeTag=document.querySelector('.exchange')
icons=document.querySelectorAll('.row i')



selectTag.forEach((tag, id)=> {
    for(const country_code in countries) {
        let selected;

        if (id==0 && country_code=='en-GB'){
            selected='selected';

        }else if(id==1 && country_code=='hi-IN'){
            selected='selected';
        }
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`

        tag.insertAdjacentHTML('beforeend', option);
    }
})


exchangeTag.addEventListener('click', ()=>{
    let tempText=fromText.value;
    let tempLanguage=selectTag[0].value;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=tempLanguage;
    fromText.value=toText.value;
    toText.value=tempText;
})

translateButton.addEventListener('click', ()=>{
    let text=fromText.value;
    translateFrom=selectTag[0].value;
    translateTo=selectTag[1].value;
    let apiURL=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

    fetch(apiURL).then(res  => res.json()).then(data => {
        toText.value=data.responseData.translatedText;
    })
})


icons.forEach(icon =>{
    icon.addEventListener('click', ({target})=>{
       if(target.classList.contains('copy-from')){
        navigator.clipboard.writeText(fromText.value);
       }else if (target.classList.contains('copy-to')){
        navigator.clipboard.writeText(toText.value)
       }else if (target.classList.contains('to-volume')){
            let speech= new SpeechSynthesisUtterance(toText.value)
            speech.lang= selectTag[1];
            speechSynthesis.speak(speech);

       }else if(target.classList.contains('from-volume')){
        let speech= new SpeechSynthesisUtterance(fromText.value)

        speech.lang=selectTag[1];

        speechSynthesis.speak(speech);
       }
    })
})

