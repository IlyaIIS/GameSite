var User = function() {
    let user = {};
    user.score = 0;
    user.scoreMode = 1;

    user.drawScore = () => {
        drawer.drawText(w/2, 30, user.score.toString());
    }

    user.addScore = () => {
        user.score += user.scoreMode;
    }

    return user;
}