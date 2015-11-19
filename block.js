/*jslint vars:true, plusplus:true */
/*global chrome */
window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var local = chrome.extension.getURL('/');

    var onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };

    var yucks = [
        { by: '株式会社DMM.com (http://corp.dmm.com/)', query: 'a[href^="http://www.dmm.co.jp/"][href*="cid="]' },
        { by: '株式会社DMM.com (http://corp.dmm.com/)', query: 'a[href^="http://ad.dmm.com/ad/"]' },
        { by: 'FC2, INC. (http://fc2.com/)', query: 'a[href^="http://media.fc2.com/clicks.php?"]' },
        { by: 'ユナイテッド株式会社 (http://united.jp/)', query: 'iframe[src^="http://bypass.ad-stir.com/"]' },
        { by: '株式会社ジーニー (http://geniee.co.jp/)', query: 'a[href*=".gsspat.jp/"]' },
        { by: 'テレコムクレジット株式会社 (http://www.bannerbridge.net/)', query: 'a[href^="http://track.bannerbridge.net/click.php?"]' },
        { by: 'アキナジスタ株式会社 (http://www.maist.jp/)', query: 'a[href^="http://ad.maist.jp/ad/"]' },
        { by: '株式会社アイモバイル (http://i-mobile.co.jp/)', query: 'iframe[src*=".i-mobile.co.jp/"]' },
        { by: '株式会社リアズ (http://reas.jp/)', query: 'a[href^="http://www.angel-live.com/?"]' },
        { by: '不明', query: 'a[href^="http://deaicute.com/chat/"]' },
        { by: '不明', query: 'a[href^="http://doutr.biz/"]' },
        { by: '不明', query: 'a[href^="http://burning-phoenix.kir.jp/"]' }
    ];

    var i, j, l, m, yuck, elements, element;

    for (i = 0, l = yucks.length; i < l; i++) {
        yuck = yucks[i];
        elements = document.querySelectorAll(yuck.query);

        for (j = 0, m = elements.length; j < m; j++) {
            element = elements[j];

            if (element.nodeName === 'A') {
                element.onclick = onclick;
                element.target = '';
                element.innerHTML = '<span style="font-size:10px;color:#aaa;">Blocked by Adult Ad Blocker.</span>';
            } else if (element.nodeName === 'IFRAME') {
                element.src = local + 'block.html';
            }
        }
    }
});
