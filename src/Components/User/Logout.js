import React, { Component } from 'react';

//como fazer o logout?
class Logout extends Component {
    logout() {
        localStorage.clear();
        window.location.href = '#home';
    }

}

export default Logout;