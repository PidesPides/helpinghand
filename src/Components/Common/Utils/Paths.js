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
    Event: "event",
    Help: "help",
    offerHelp: "/offer",
    joinEvent: "/join",
    BackOffice: "/backoffice",
    AboutUs: "/aboutus"
}

const ServicePathsLabel = {
    Api: "http://localhost:8080/rest/",
    ApiProd: "https://thehelpinghand.ew.r.appspot.com/rest/",
    User: "user",
    Institution: "institution"

}

const Roles = {
    User: "user/",
    Institution: "institution/",
    Admin: "admin/",
    Gbo:"gbo/"
}


export { PathsLabel, ServicePathsLabel, Roles };