import { Link } from "react-router-dom";

type GalleryItemProps = {
    imageURL : string,
    tittle : string,
    url : string,
    sizeItem : 6 | 7 | 8 | 9 | 10;
}

const GalleryItem: React.FC<GalleryItemProps> = ({imageURL, tittle, url, sizeItem}) => {
    /* if sizeItem = 6 
     * a#w-48 a#p-6 a#h-40 => 48/6 = 8 ; 6/6 = 1 ; 40/6 = 6.66
     * a>div#size-20 => 20/6 = 3.33
     * a>div>img#size-20
     */
    let a_w : string = ""
    let a_p : string = ""
    let a_h : string = ""
    let s : string = ""

    switch (sizeItem) {
        case 6:
            a_w = "w-48";
            a_p = "p-6";
            a_h = "h-40";
            s = "size-20";
            break;
        case 7:
            a_w = "w-41.1";
            a_p = "p-5";
            a_h = "h-34";
            s = "size-17";
            break;
        case 8:
            a_w = "w-64";
            a_p = "p-8";
            a_h = "h-56";
            s = "size-26";
            break;
        case 9:
            a_w = "w-72";
            a_p = "p-9";
            a_h = "h-63";
            s = "size-29";
            break;
        case 10:
            a_w = "w-80";
            a_p = "p-10";
            a_h = "h-70";
            s = "size-32";
    }

    return(
        <div className="">
            <Link to={url} className={`${a_w} ${a_h} ${a_p} bg-blue-100 flex flex-col justify-center items-center text-center`}>
                <div id="image-show" className={`bg-red-400 ${s} rounded-full`}>
                    <img src={imageURL} className={s} alt="" />
                </div>
                <p>{tittle}</p>
            </Link>
        </div>
    )
}

export default GalleryItem;