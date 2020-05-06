function darkToggle() {
    console.log("dark toggle")
    toggleText()
    toggleBG()
}

function toggleBG() {
    var light = $('.w3-white')
    var dark = $('.w3-dark-grey')
    light.addClass('w3-dark-grey')
    light.removeClass('w3-white')
    dark.addClass('w3-white')
    dark.removeClass('w3-dark-grey')
}

function toggleText() {
    var light = $('.w3-text-grey')
    var dark = $('.w3-text-white')
    var navdark = $('.nav-dark')
    var navlight = $('.nav-light')
    light.addClass('w3-text-white')
    light.removeClass('w3-text-grey')
    dark.addClass('w3-text-grey')
    dark.removeClass('w3-text-white')
    console.log(navdark)
    console.log(navlight)
    if (0 < navdark.length) {
        navdark.addClass('w3-text-dark-grey nav-light')
        navdark.removeClass('w3-text-dark')
    }
    if (0 < navlight.length) {
        navlight.addClass('w3-text-white nav-dark')
        navlight.removeClass('w3-text-dark-grey nav-light')
    }
}

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function populateProjectCards(data) {
    var projectsHtml = ""
    data.forEach(project => {
        projectsHtml += makeProjectCard(project);
    });
    document.getElementById("projects-container").innerHTML = projectsHtml;
    var elem = document.querySelector('.grid');
    var msnry = new Masonry(elem, {
        // options
        columnWidth: '.grid-item',
        itemSelector: '.grid-item',
    });
}

function makeProjectCard(project) {
    var projectHtml = ""
    projectHtml += "<div class='w3-col m6 l4 grid-item'>"
    projectHtml += "  <div class='w3-card-4 w3-white w3-round w3-text-grey card' style='min-height:100%'>";
    projectHtml += "    <header class='w3-container'>"
    projectHtml += "      <h4 style='font-weight:bold'>" + project.title + "</h4>";
    projectHtml += "      <h6>"
    projectHtml += "        <i class='fa fa-code fa-fw w3-margin-right w3-text-teal w3-left'"
    projectHtml += "          style='display:inline-block!important; margin-top:4px'></i>"
    project.languages.forEach(lang => {
        projectHtml += "<div class='w3-container w3-round-xlarge w3-center w3-teal chip w3-left'>" + lang + "</div>"
    })
    projectHtml += "      </h6>"
    projectHtml += "    </header>"
    projectHtml += "    <hr style='margin-bottom:0px; margin-top:8px'>"
    projectHtml += "    <div class='w3-container'>"
    project.description.forEach(paragraph => {
        projectHtml += "<p>" + paragraph + "</p>"
    })
    projectHtml += "      <h6><i class='fa fa-highlighter fa-fw w3-margin-right w3-text-teal'></i><span class='w3-text-teal'>Highlights:</span>&nbsp;"
    project.highlights.forEach(function (highlight, index) {
        projectHtml += highlight
        if (index < project.highlights.length - 1) projectHtml += ",&nbsp;"
        else projectHtml += "&nbsp;"
    })
    projectHtml += "      <h6><i class='fa fa-asterisk fa-fw w3-margin-right w3-text-teal'></i><span class='w3-text-teal'>Challenges:</span>&nbsp;"
    project.challenges.forEach(function (challenge, index) {
        projectHtml += challenge
        if (index < project.challenges.length - 1) projectHtml += ",&nbsp;"
        else projectHtml += "&nbsp;"
    })
    projectHtml += "    </div>"
    projectHtml += "    <hr style='margin:0px'>"
    projectHtml += "    <footer class='w3-container w3-large w3-center' style='margin-top:0px;'>"
    if (project.sourceUrl != "#") {
        projectHtml += "<a href='" + project.sourceUrl + "' target='_blank'>Source Code</a>"
    }
    else {
        projectHtml += "<a href='#' class='w3-text-red'>Link Unavailable</a>"
    }
    projectHtml += "    </footer>"
    projectHtml += "  </div>"
    projectHtml += "</div>"
    return projectHtml
}