const PathsLabel = {
    Home: "/",
    Register: "/register",
    Login: "/login",
    UpdateInfo: "/info",
    Profile: "/profile",
    ProfileSettings:"/profilesettings",
    ChangePassword: "/password",
    Maps: "/maps",
    Delete: "/delete",
    Visibility:"/visibility",
    Event: "event",
    Feed: "/feed",
    Help: "help",
    Helper:"/helper",
    Finish:"/finish",
    End:"/end",
    Cancel:"/cancel",
    Avatar:"/avatar",
    offerHelp: "/offer",
    joinEvent: "/join",
    BackOffice: "/backoffice",
    AboutUs: "/aboutus"
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
    Gbo:"gbo/",
    Admin: "admin/"
    
}


export { PathsLabel, ServicePathsLabel, Roles };