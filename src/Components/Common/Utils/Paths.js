const PathsLabel = {
    Home: "/",
    Register: "/register",
    Login: "/login",
    UpdateInfo: "/info",
    UpdateEmail:"/email",
    Profile: "/profile",
    ProfileSettings:"/profilesettings",
    ChangePassword: "/password",
    Account:"/account",
    Maps: "/maps",
    Stats: "/stats",
    Delete: "/delete",
    Visibility:"/visibility",
    Event: "event",
    Feed: "/feed",
    Leave:"/leave",
    Help: "help",
    Helping:"/helping",
    Participating:"/participating",
    Helper:"/helper",
    ListPartic:"/list",
    Finish:"/finish",
    End:"/end",
    Cancel:"/cancel",
    Avatar:"/avatar",
    offerHelp: "/offer",
    joinEvent: "/join",
    BackOffice: "/backoffice",
    AboutUs: "/aboutus",
    Report:"/report",
    EmailVerification:"/confirmation"
}

const ServicePathsLabel = {
    Api: "http://localhost:8080/rest/",
    ApiProd: "https://thehelpinghand.ew.r.appspot.com/rest/",
    ImageBucket: "https://storage.googleapis.com/thehelpinghand.appspot.com/avatars/",
    User: "user",
    Institution: "institution"

}

const Roles = {
    User: "user/",
    Institution: "institution/",
    Gbo:"restricted/",
    Admin: "admin/"
    
}


export { PathsLabel, ServicePathsLabel, Roles };