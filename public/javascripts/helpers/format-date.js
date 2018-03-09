var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var formatDate = {};

formatDate.twitterDate = (post) => {

    let newDate = new Date(post.smDate);
    let d = newDate.getDay();
    let m = months[newDate.getMonth()];
    let y = newDate.getFullYear();

    let t = newDate.get

    return {
        smDate: d+' '+m+' '+y,
        smPlatform: post.smPlatform,
        smContent: post.smContent,
        smAvatarUrl: post.smAvatarUrl,
        smImageUrl: post.smImageUrl,
        smUserName: post.smUserName,
        smName: post.smName
    }
};

module.exports = formatDate;