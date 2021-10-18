import { useEffect } from "react";

function LanguageCheckBox(props) {
    let { language } = props;
    let langString = `lang.${language.languageid}`;

    useEffect(() => {
        console.log(language.languageid);
        console.log(language.language);
    }, []);

    return(
        <div className="lcb">
            {language && <label>{language.language}</label>}
            {language &&
            <input  type="checkbox" 
                name={langString} />}
        </div>
    )
}

export {
    LanguageCheckBox
}