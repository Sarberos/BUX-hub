export enum EnumIcons { 
    INSTAGRAM="instagram",
    FACEBOOK = "facebook", 
    TELEGRAM = "telegram", 
    TWITTER = "twitter", 
    YOUTUBE = "youtube", 
    FIRE = "fire" 
}

export type TTaskImg= {
    [key in EnumIcons]: string
}

