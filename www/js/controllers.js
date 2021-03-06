angular.module('microwave.controllers', ['ionic', 'microwave.services'])


.controller('ConfigCtrl', ['$timeout', '$scope', 'Config', 'Popcorn', function($timeout, $scope, Config, Popcorn) {

  // Loads the config from the config service.
  $scope.config = Config.load();

  // Check for form submit to validate data.
  $scope.submitAttempt = function() {

    $scope.formSubmitted = true;

  }

  // Saves the configuration form data.
  $scope.saveConfig = function(config) {

    Config.save(config);
    $scope.test = false; // Hides test information.
    $scope.saved = true;

    $timeout(function() { $scope.saved = false; }, 2000);

  }

  // Pings the API to check for connection.
  $scope.testConfig = function() {

    $scope.test = true; // Displays test status.

    Popcorn.ping($scope.config).then(function(ping) {

      if ( ping.error ) {

        $scope.error = ping.error; // Displays test error.
        $scope.test = false // Hides test information.

      } else {

        $scope.connected = ping; // Displays test information.
        $scope.error = false; // Removes test error if any.

      }

    });

  }

}])

.controller('RemoteCtrl', ['$timeout', '$scope', '$ionicPopup', 'Popcorn', function($timeout, $scope, $ionicPopup, Popcorn) {

  // Popcorn Service Calls
  $scope.toggleTab = function() {
    Popcorn.toggleTab();
  };

  $scope.showFavorites = function() {
    Popcorn.showFavorites();
  };

  $scope.showWatchlist = function() {
    Popcorn.showWatchlist();
  };

  $scope.showSettings = function() {
    Popcorn.showSettings();
  };

  $scope.up = function() {
    Popcorn.up();
  };

  $scope.down = function() {
    Popcorn.down();
  };

  $scope.left = function() {
    Popcorn.left();
  };

  $scope.right = function() {
    Popcorn.right();
  };

  $scope.doww = function() {
    Popcorn.down();
  };

  $scope.enter = function() {
    Popcorn.enter();
  };

  $scope.showFilterOptions = function() {

    $scope.filterOption = {};

    Popcorn.getGenres().then(function(genres) {

      $scope.genresList = genres.result.genres;

      $ionicPopup.show({
        template: '<div class="list"><label class="item item-input item-select"><div class="input-label">Genre</div><select name="genre" ng-model="filterOption.genre" ng-options="o as o for o in genresList"></select></label></div>',
        title: 'Select Genre',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Filter</b>',
            type: 'button-assertive',
            onTap: function(event) {

              var selectedGenre = $scope.filterOption.genre || 'All';
              
              Popcorn.filterGenre(selectedGenre);

            }
          },
        ]
      });

    });

  };

  $scope.showSortOptions = function() {

    $scope.sortOption = {};

    Popcorn.getSorters().then(function(sorters) {

      $scope.sortersList = sorters.result.sorters;

      $ionicPopup.show({
        template: '<div class="list"><label class="item item-input item-select"><div class="input-label">Sort by</div><select name="sort" ng-model="sortOption.sort" ng-options="o as o for o in sortersList"></select></label></div>',
        title: 'Sort List',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Sort</b>',
            type: 'button-assertive',
            onTap: function(event) {

              var selectedSorter = $scope.sortOption.sort || 'popularity';
              
              Popcorn.filterSorter(selectedSorter);

            }
          },
        ]
      });

    });

  };

  $scope.back = function() {
    Popcorn.back();
  };

  $scope.toggleMute = function() {
    Popcorn.toggleMute();
  };

  $scope.seasonUp = function() {
    Popcorn.seasonUp();
  };

  $scope.seasonDown = function() {
    Popcorn.seasonDown();
  };

  $scope.volumeUp = function() {
    
    Popcorn.getPlaying().then(function(response) {
      
      if ( response.result.volume === 1 ) {

        return;

      } else {

        Popcorn.volume(response.result.volume + 0.1);

      }

    });

  };

  $scope.volumeDown = function() {
    
    Popcorn.getPlaying().then(function(response) {
      
      if ( response.result.volume === 0 ) {

        return;

      } else {

        Popcorn.volume(response.result.volume - 0.1);

      }

    });

  };

  $scope.play = function() {
    
    Popcorn.getPlaying().then(function(response) {
      
      if ( response.result.playing === false ) {

        Popcorn.togglePlaying();

      } 

    });

  };

  $scope.pause = function() {
    
    Popcorn.getPlaying().then(function(response) {
      
      console.log(response);

      if ( response.result.playing === true ) {

        Popcorn.togglePlaying();

      } 

    });

  };

  $scope.backward = function() {
    Popcorn.left();
  };

  $scope.forward = function() {
    Popcorn.right();
  };

  $scope.toggleWatched = function() {
    Popcorn.toggleWatched();
  };

  $scope.toggleFavorite = function() {
    Popcorn.toggleFavorite();
  };

  $scope.showSubtitleList = function() {

    $scope.subtitleOption = {};

    Popcorn.getSubtitles().then(function(subtitles) {

      $scope.subtitleList = subtitles.result.subtitles;

      $ionicPopup.show({
        template: '<div class="list"><label class="item item-input item-select"><div class="input-label">Language</div><select name="language" ng-model="subtitleOption.subtitle" ng-options="o as o for o in subtitleList"></select></label></div>',
        title: 'Select Subtitles',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Set</b>',
            type: 'button-assertive',
            onTap: function(event) {

              var selectedSubtitle = $scope.subtitleOption.subtitle || '';
              
              Popcorn.setSubtitle(selectedSubtitle);

            }
          },
        ]
      });

    });

  };

  $scope.toggleQuality = function() {
    Popcorn.toggleQuality();
  };

  $scope.watchTrailer = function() {
    Popcorn.watchTrailer();
  };

  $scope.showPlayerList = function() {

    $scope.playerOption = {};

    var playerLIst = [];

    Popcorn.getPlayers().then(function(players) {

      players.result.players.forEach(function(element, index, array) {

        playerLIst.push(element.id);

      });

      $scope.playersList = playerLIst;

      $ionicPopup.show({
        template: '<div class="list"><label class="item item-input item-select"><div class="input-label">Player</div><select name="player" ng-model="playerOption.player" ng-options="o as o for o in playersList"></select></label></div>',
        title: 'Select Player',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Select</b>',
            type: 'button-assertive',
            onTap: function(event) {

              var selectedPlayer = $scope.playerOption.player || '';
              
              Popcorn.setPlayer(selectedPlayer);

            }
          },
        ]
      });

    });

  };

  $scope.toggleFullscreen = function() {
    Popcorn.toggleFullscreen();
  };


  $scope.searchString = {};
  $scope.showSearchForm = function() {

    var searchModal = $ionicPopup.show({
      template: '<label class="item item-input"><input type="text" ng-model="searchString.term"></label>',
      title: 'Search',
      scope: $scope,
      buttons: [
        { 
          text: 'Cancel',
          type: 'button-small' 
        },
        { 
          text: 'Clear', 
          type: 'button-energized button-small',
          onTap: function(event) {

            $scope.searchString.term = '';
            Popcorn.clearSearch();

          }
        },
        {
          text: 'GO',
          type: 'button-assertive button-small',
          onTap: function(event) {

            Popcorn.filterSearch($scope.searchString.term);

          }
        },
      ]
    });

  };

}])
