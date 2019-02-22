// ==UserScript==
// @name         Azure DevOps Japanese Text Translation
// @namespace    https://www.ryuzee.com/
// @version      0.0.10
// @description  Replace major English words into Japanese
// @author       Ryuzee
// @match        https://(dev.azure.com)|(.*.visualstudio.com)/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // オブザーバインスタンスを作成
  var observer = new MutationObserver(function(mutations, observer) {
    mutations.forEach(function(mutation){
      process(mutation.target);
    });
  });

  observer.observe(document, {
    subtree: true,
    attributes: true
  });

  // 変更検知以外にも定期実行
  setInterval(
    function() { process(document); },
    500
  );

  var process = function(source) {
      var keys = [
        "button.btn-cta",
        // "button.ms-CommandBarItem-link",
        "div.body-l",
        "div.expand-collapse-text",
        "div.hub-title",
        "div.ms-Button-label",
        "div.ms-TooltipHost",
        "div.succeeded-text",
        "div.text",
        "div.title",
        "div.title-m",
        "div.upsell-title",
        "div.vss-HubTitle--titleText",
        "div.vss-PickList--groupHeader",
        "h1.page-title",
        "h1.vc-newbranches-title",
        "h3.right-pane-header-title",
        "label.ms-Label",
        "label.workitemcontrol-label",
        "span.bolt-button-text",
        "span.commandbar-item-text",
        "span.headerlabel",
        "span.ms-CommandBarItem-commandText",
        "span.ms-ContextualMenu-itemText",
        "span.ms-DetailsHeader-cellName",
        "span.ms-Dropdown-optionText",
        "span.ms-Dropdown-title",
        "span.ms-Dropdown-title span",
        "span.ms-Pivot-text",
        "span.new-feed-text",
        "span.page-button",
        "span.queries-favorite-list-header-name",
        "span.text",
        "span.tfs-collapsible-text span",
        "span.ui-button-text",
        "span.vss-PickList--multiSelectText",
        "span.vss-PickList--selectableElementButton-text",
        "span.vss-PickListDropdown--title-text",
        "title",
      ];

      var elms = [];
      for(var i=0; i < keys.length; i++){
        elms.push(source.querySelectorAll(keys[i]));
      }
      processElements(elms);
  };

  var processElements = function(elms) {
    for(var i=0; i<elms.length; i++) {
      var elm = elms[i];
      for(var j = 0, l = elm.length; j < l; j++) {
        var el = elm[j];
        replaceWords(el);
      }
    }
  };

  var replaceWords = function(elm) {
    var rep = [
      /** 長いので先にやる **/
      ["All dashoboards", "全てのダッシュボード"],
      ["Back to Work Items", "作業項目に戻る"],
      ["Browse All Sprints", "全てのスプリントを見る"],
      ["Browse All Backlogs", "全てのバックログを見る"],
      ["Browse All Boards", "全てのボードを見る"],
      ["Create Project", "新規プロジェクト"],
      ["My Pull Requests", "自分のプルリクエスト"],
      ["My favorite dashboards", "お気に入りのダッシュボード"],
      ["My organizations", "自分の組織"],
      ["My Team Sprints", "自分のチームのスプリント"],
      ["My Team Backlogs", "自分のチームのバックログ"],
      ["My Work Items", "自分の作業項目"],
      ["Product Backlog Item", "プロダクトバックログアイテム"],
      ["Product Backlog", "プロダクトバックログ"],
      ["Recently created", "最近作成した項目"],
      ["Recently Completed", "最近完了した項目"],
      ["Recently updated", "最近更新した項目"],
      ["Upload File\\(s\\)", "ファイルのアップロード"],
      ["View as Backlog", "バックログ形式で見る"],
      /** アルファベット順 **/
      ["Abandoned", "破棄済"],
      ["About this project", "このプロジェクトについて"],
      ["Acceptance Criteria", "受け入れ基準"],
      ["Active", "アクティブ"],
      ["Activity Date", "更新日"],
      ["Add a column", "カラムを追加"],
      ["Add a deployment group", "デプロイグループの追加"],
      ["Add at selection", "選択した位置に追加"],
      ["Add link", "リンクを追加"],
      ["Add project description", "プロジェクトの説明を追加"],
      ["Add to top", "先頭に追加"],
      ["Add to bottom", "末尾に追加"],
      ["Add to DashBoard", "ダッシュボードに追加"],
      ["Add to My favorites", "自分のお気に入りに追加"],
      ["Add user", "ユーザー追加"],
      ["Agent pools", "エージェントプール"],
      ["All load test runs", "全てのロードテスト"],
      ["All Parameter Sets", "全てのパラメーターセット"],
      ["All Releases", "全てのリリース"],
      ["Analytics", "分析"],
      ["Area Path", "エリアパス"],
      ["Artifacts", "作成物"],
      ["Assigned To me", "自分にアサイン"],
      ["Assigned To", "アサイン"],
      ["Available pools", "利用可能なプール"],
      ["Backlog items", "バックログ項目"],
      ["Backlogs", "バックログ"],
      ["Backlog", "バックログ"],
      ["Branch Name", "ブランチ名"],
      ["Branches", "ブランチ"],
      ["Branch", "ブランチ"],
      ["Build Pipelines", "ビルドパイプライン"],
      ["Builds succeeded", "成功したビルド"],
      //["Bug", "バグ"], // ビルド設定の箇所のdebugとぶつかるので削除
      ["Business Value", "ビジネス価値"],
      ["Cancel", "キャンセル"],
      ["Capacity", "キャパシティ"],
      ["Capture", "キャプチャー"],
      ["Changed Date", "更新日"],
      ["Changed by", "更新者"],
      ["Change type", "変更の種類"],
      ["Charts", "チャート"],
      //["Clone", "複製"], // gitとぶつかるので削除
      ["Clear Filters", "フィルターのクリア"],
      ["Collapse all", "全てを閉じる"],
      ["Column Options", "カラムオプション"],
      ["Comments", "コメント"],
      ["Comment", "コメント"],
      ["Commits", "コミット"],
      ["Commit", "コミット"],
      ["Configurations", "設定"],
      ["Connect your GitHub account", "GitHubアカウントと接続する"],
      ["Contents", "コンテンツ"],
      ["Copy query URL", "クエリーのURLをコピー"],
      ["Create a draft release", "リリース候補を作成"],
      ["Create a release", "リリースを作成"],
      ["Create copy of work item", "作業項目のコピーを作成"],
      ["Create query", "クエリーの作成"],
      ["Create Tag", "タグの作成"],
      ["Create Wiki", "Wikiの作成"],
      ["Creation Date", "作成日"],
      ["Currently deployed", "現在デプロイ済"],
      ["Customize", "カスタマイズ"],
      ["DashBoards", "ダッシュボード"],
      ["Dashboard", "ダッシュボード"],
      ["Deployment group name", "デプロイグループ名"],
      ["Deployment groups", "デプロイグループ"],
      ["Deployments succeeded", "成功したデプロイ"],
      ["Description", "説明"],
      ["Details", "詳細"],
      ["Discard", "破棄"],
      ["Download Agent", "エージェントのダウンロード"],
      ["Download as Zip", "Zipでダウンロード"],
      ["Duration", "所要時間"],
      ["Editor", "エディタ"],
      ["Edit and Preview", "編集してプレビュー"],
      ["Edit profile", "プロファイルを編集"],
      ["Edit", "編集"],
      ["Effort", "規模"],
      ["Email query", "クエリーをメール"],
      ["Email work item", "作業項目をメール"],
      ["Epics", "エピック"],
      ["Epic", "エピック"],
      ["Expand all", "全てを開く"],
      ["Features", "フィーチャー"],
      ["Feature", "フィーチャー"],
      ["Folder", "フォルダー"],
      ["Following", "フォローしている項目"],
      ["From Date", "開始日"],
      ["Full History", "完全な履歴"],
      ["GitHub connections", "GitHubコネクション"],
      ["Impediments", "妨害事項"],
      ["Impediment", "妨害事項"],
      ["Import a task group", "タスクグループのインポート"],
      ["Import release pipeline", "リリースパイプラインのインポート"],
      ["Import a pipeline", "パイプラインのインポート"],
      ["Import", "インポート"],
      ["Invite", "招待"],
      ["Iteration Path", "イテレーションパス"],
      ["Iteration", "イテレーション"],
      ["Keyboard shortcuts", "キーボードショートカット"],
      ["Last modified by", "最終更新日"],
      ["Last 1 day", "過去1日"],
      ["Last 7 days", "過去7日"],
      ["Last 30 days", "過去30日"],
      ["Latest Update", "最終更新日"],
      ["Leave", "移動"],
      ["Library", "ライブラリ"],
      ["Link Variable group", "変数グループにリンク"],
      ["Load test", "ロードテスト"],
      ["Members", "メンバー"],
      ["Mentioned", "メンションされた項目"],
      ["Mine", "自分"],
      ["Move to team project", "チームプロジェクトに移動"],
      ["My activity", "自動のアクティビティ"],
      ["My favorites", "自分のお気に入り"],
      ["My Favorites", "自分のお気に入り"],
      ["New branch", "新規ブランチ"],
      ["New build pipeline", "新規ビルドパイプライン"],
      ["New feed", "新規フィード"],
      ["New File Name", "新規ファイル名"],
      ["New Folder Name", "新規フォルダ名"],
      ["New item", "新規項目"],
      ["New linked work item", "関連する作業項目を作成"],
      ["New Organization", "新規組織"],
      ["New pull request", "新規プルリクエスト"],
      ["New query", "新しいクエリー"],
      ["New release pipeline", "新規リリースパイプライン"],
      ["New Sprint", "新しいスプリント"],
      ["New Team", "新規チーム"],
      ["New Test Plan", "新規テスト計画"],
      ["New Work Item", "新しい作業項目"],
      ["Notifications", "通知"],
      ["Open filtered view in Queries", "クエリーで開く"],
      ["Open in Queries", "クエリーで開く"],
      ["Options", "オプション"],
      ["Order", "順番"],
      ["Organization settings", "組織の設定"],
      ["Overview", "概要"],
      ["Parameters", "パラメーター"],
      ["Permanently delete", "完全に削除"],
      ["Pipelines", "パイプライン"],
      ["Policies", "ポリシー"],
      ["Priority", "優先順位"],
      ["Project configuration", "プロジェクト設定"],
      ["Project Name", "プロジェクト名"],
      ["Project settings", "プロジェクト設定"],
      ["Project stats", "プロジェクトの状況"],
      ["Projects", "プロジェクト"],
      ["Publish code as wiki", "コードをWikiページにする"],
      ["Pull requests opened", "オープンされたプルリクエスト"],
      ["Pull requests", "プルリクエスト"],
      ["Pushes", "プッシュ"],
      ["Queries", "クエリー"],
      ["Queued", "キュー追加"],
      ["Queue", "キュー"],
      //["Reason", "事由"],
      ["Recycle Bin", "ゴミ箱"],
      ["Related Work", "関連する作業"],
      ["Release Retention", "リリース保持期間"],
      ["Releases", "リリース"],
      ["Remaining Work", "残作業"],
      ["Repositories", "レポジトリ"],
      ["Repository", "レポジトリ"],
      ["Repos", "レポジトリ"],
      ["Results", "結果"],
      ["Retention and parallel jobs", "保持期間と並列ジョブ"],
      ["Retention", "保持期間"],
      ["Revert changes", "変更を元に戻す"],
      ["Runs", "実行結果"],
      ["Run query", "クエリーの実行"],
      ["Save changes", "変更を保存"],
      ["Save items", "項目を保存"],
      ["Save query", "クエリーの保存"],
      ["Secure files", "セキュアファイル"],
      ["Security", "セキュリティ"],
      ["Send", "送信"],
      ["Service Connections", "サービスコネクション"],
      ["Service Connection", "サービスコネクション"],
      ["Service Hooks", "サービスフック"],
      ["Simple History", "シンプルな履歴"],
      ["Sprints", "スプリント"],
      ["Stages", "ステージ"],
      ["Stage Summary", "ステージサマリー"],
      ["Start storyboarding", "ストーリーボードを作る"],
      ["States", "状態"],
      ["State", "状態"],
      ["Status", "状態"],
      ["Stay", "続行"],
      ["Summary", "サマリー"],
      ["Tags", "タグ"],
      ["Taskboard", "タスクボード"],
      ["Task Groups", "タスクグループ"],
      ["Tasks", "タスク"],
      ["Task", "タスク"],
      ["Team Configuration", "チーム設定"],
      ["Teams", "チーム"],
      ["Team", "チーム"],
      ["Templates", "テンプレート"],
      ["Test Case", "テストケース"],
      ["Test Plans", "テスト計画"],
      ["Title", "タイトル"],
      ["To Date", "終了日"],
      ["Triggers", "トリガー"],
      ["Trigger", "トリガー"],
      ["Types", "種別"],
      ["Undo changes", "変更を元に戻す"],
      ["Value Area", "価値領域"],
      ["Variable Groups", "変数グループ"],
      ["Variable group name", "変数グループ名"],
      ["Variable group", "変数グループ"],
      ["Variables", "変数"],
      ["View as board", "ボードで見る"],
      ["View as backlog", "バックログで見る"],
      ["Why are my commit in this order?", "なぜ自分のコミットがこの順番ですか？"],
      ["Work items created", "作成された作業項目"],
      ["Work items completed", "完成した作業項目"],
      ["Work Items to link", "リンクする作業項目"],
      ["Work Items", "作業項目"],
      ["Work Item Type", "作業種別"],
      /** 汎用 **/
      ["Add", "追加"],
      //["All", "全て"], // 副作用が大きい
      ["Area", "エリア"],
      ["Boards", "ボード"],
      ["Board", "ボード"],
      ["Builds", "ビルド"],
      ["Clear", "クリア"],
      ["Completed", "完了"],
      ["Created", "作成日"],
      ["Create", "作成"],
      ["Delete", "削除"],
      ["Development", "開発"],
      ["Discussion", "ディスカッション"],
      ["Export", "エクスポート"],
      ["Files", "ファイル"],
      ["File", "ファイル"],
      ["Groups", "グループ"],
      ["History", "履歴"],
      ["Rename", "リネーム"],
      ["Links", "リンク"],
      ["Link", "リンク"],
      ["Move", "移動"],
      ["Name", "名前"],
      ["New", "新規"],
      ["Planning", "プランニング"],
      ["Save & Close", "保存して閉じる"],
      ["Save", "保存"],
    ];

    // 空のテキストノードを強制的に削除する
    var child = elm.childNodes;
    var k = 0;
    while(k < child.length) {
      if(child[k].nodeName == "#text" && child[k].nodeValue.replace(/[\n ]+/, "") == "") {
        elm.removeChild(child[k]); //textノードを削除
      }
      k++;
    }

    // 要素がテキストノードでhtmlタグがない場合だけ置換
    if (elm.childNodes.length == 1 && elm.childNodes[0].nodeType == 3) {
      var source = elm.textContent;
      for(var i=0; i<rep.length; i++) {
        source = source.replace(new RegExp(rep[i][0], 'ig'), rep[i][1]);
      }
      elm.textContent = source;
    }
  };
})();
