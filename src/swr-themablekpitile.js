define( [
        'jquery',
        'underscore',
        './properties',
        './lib/js/extensionUtils',
        'text!./lib/partials/template.ng.html',
        'text!./lib/css/style.css',
        'text!./config/layouts.json'
    ],
    function ( $, _, props, extensionUtils, ngTemplate, cssContent, layoutsText ) {
        'use strict';

        extensionUtils.addStyleToHeader( cssContent, 'swr-themablekpitile' );
        var layouts = JSON.parse( layoutsText );

        return {

            initialProperties: {
                showTitles: false
            },
            definition: props,
            snapshot: {canTakeSnapshot: true},
            template: ngTemplate,
            controller: ['$scope', '$element', '$sce', function ( $scope, $element, $sce ) {

                console.log( '$scope', $scope );
                // var kpiIcon='AAA';

                /**
                 * Get either the property value or the default one.
                 * @param key
                 * @returns {*}
                 */
                $scope.get = function ( key ) {

                    if ( !$scope.layout.props || !$scope.layout.props.layoutMode ) {
                        return '';
                    }

                    var defaults = {
                        "tileBackgroundColor": "#E7E7E7", //#F8F8F8
                        "titleColor": "#333333",
                        "comparisonPositiveColor": "#006600",
                        "comparisonNegativeColor": "#CC0000",
                        "comparisonNeutralColor": "#333333",
                        "comparisonPositiveIcon": "&#9650;",
                        "comparisonNegativeIcon": "&#9660;",
                        "comparisonNeutralIcon": "&#9654;",
                        "titleFontSize": "12px",
                        "kpiFontSize":"16px",
                        "comparisonFontSize":"14px"
                    };

                    switch ( $scope.layout.props.layoutMode ) {
                        case "default":
                            return defaults[key];
                            break;
                        case "custom":
                            return $scope.layout.props[key];
                            break;
                        case "template":
                            var selectedTemplate = $scope.layout.props.layoutTemplate;
                            return (layouts[selectedTemplate]) ? layouts[selectedTemplate][key] : '';
                            break;
                    }
                };
                $scope.setStyles = function () {

                    console.log( 'setStyles >> height', $element.height() );

                    var padding = 14; // 7 top and bottom
                    var elemHeight = $element.height() - padding;
                    var hPadding = 2; // 1 left and right
                    var elemWidth = $element.width() - hPadding;

                    // Tile
                    $scope.tileStyle = {
                        backgroundColor: $scope.get( 'tileBackgroundColor' )
                    };

                    // KPI Title
                    $scope.titleStyle = {
                        color: $scope.get( 'titleColor' ),
                        // fontSize: $scope.get( 'titleFontSize' ) + 'px'
                        // fontSize: Math.max( Math.min((elemHeight / 6), (elemWidth / 8),$scope.get( 'titleFontSize' )), 12 ) + 'px'
                        // fontSize: (elemHeight  * $scope.get( 'titleFontSize' ) / ($scope.get( 'titleFontSize' )+$scope.get( 'kpiFontSize' )+$scope.get( 'comparisonFontSize' )))-3  + 'px'
                        fontSize: Math.max(Math.floor(elemHeight+elemWidth)/30,8)
                    };

                    // KPI
                    $scope.kpiStyle = {
                        color: $scope.get( 'kpiColor' ),
                        // fontSize: Math.max( Math.min((elemWidth / 8),(elemHeight / 6),$scope.get( 'kpiFontSize' )), 14 ) + 'px',
                        fontSize: ((elemHeight -(elemHeight / 10)) * $scope.get( 'kpiFontSize' ) / ($scope.get( 'titleFontSize' )+$scope.get( 'kpiFontSize' )+$scope.get( 'comparisonFontSize' )))-3 + 'px',
                        paddingTop: Math.max( (elemHeight / 10) ) + 'px'
                    };

                    // KPI Comparison
                    $scope.kpiComparisonStyle = {
                        // fontSize: Math.max( Math.min((elemWidth / 8)-0.5,(elemHeight / 7),$scope.get( 'comparisonFontSize' )), 6 ) + 'px',
                        fontSize: (elemHeight  * $scope.get( 'comparisonFontSize' ) / ($scope.get( 'titleFontSize' )+$scope.get( 'kpiFontSize' )+$scope.get( 'comparisonFontSize' )))-3 + 'px',
                        color: $scope.get( 'comparisonColor' )

                    };

                    // KPI Icon (not a style, but normal binding)
                    setKpiIcon();
                    resizeFonts();
                };

                function resizeFonts() {
                  var el, elements, _i, _len, _results;
                  elements = $('.resize');
                  console.log(elements);
                  if (elements.length < 0) {
                    return;
                  }
                  _results = [];
                  for (_i = 0, _len = elements.length; _i < _len; _i++) {
                    el = elements[_i];
                    _results.push((function(el) {
                      var resizeText, _results1;
                      resizeText = function() {
                        var elNewFontSize;
                        elNewFontSize = (parseInt($(el).css('font-size').slice(0, -2)) - 1) + 'px';
                        return $(el).css('font-size', elNewFontSize);
                      };
                      _results1 = [];
                      while (el.scrollHeight > el.offsetHeight) {
                        _results1.push(resizeText());
                      }
                      return _results1;
                    })(el));
                  }
                  return _results;
                }

                function getKpiComparisonColor () {

                    if ( !$scope.layout.props || !$scope.layout.props.layoutMode ) {
                        return '';
                    }

                    if ( $scope.layout.props.kpiComparison > 0 ) {
                        return $scope.get( 'comparisonPositiveColor' );
                    } else if ( $scope.layout.props.kpiComparison < 0 ) {
                        return $scope.get( 'comparisonNegativeColor' );
                    } else {
                        return $scope.get( 'comparisonNeutralColor' );
                    }
                }

                function setKpiIcon () {
                    //console.log( 'kpiComparison', $scope.layout.props.kpiComparison );
                    console.log( 'kpiComparison', $scope.layout.props );
                    console.log( '$scope.layout', $scope.layout );
                    console.log('$scope', $scope);

                    if ( !$scope.layout.props || !$scope.layout.props.layoutMode ) {
                        return '';
                    }

                    // if ( $scope.layout.props.kpiComparison > 0 ) {
                    //     $scope.kpiIcon = $sce.trustAsHtml( $scope.get( 'comparisonPositiveIcon' ) );
                    // } else if ( $scope.layout.props.kpiComparison < 0 ) {
                    //     $scope.kpiIcon = $sce.trustAsHtml( $scope.get( 'comparisonNegativeIcon' ) );
                    // } else {
                    //     $scope.kpiIcon = $sce.trustAsHtml( $scope.get( 'comparisonNeutralIcon' ) );
                    // }
                    $scope.kpiIcon = $scope.layout.props.comparisonSymbol;
                }

                $scope.$watch( function () {
                    return {
                        h: $element.height(),
                        w: $element.width()
                    }
                }, function ( newVal, oldVal ) {
                    if ( newVal && (newVal.h !== oldVal.h || newVal.w !== oldVal.w ) ) {
                        console.log( 'element dimensions', {newVal: newVal, oldVal: oldVal} );
                        $scope.setStyles();
                    }
                }, true );

                // Properties watch
                $scope.$watch( function () {
                    return {
                        kpiComparison: ($scope.layout.props) ? $scope.layout.props.kpiComparison : null,
                        layoutMode: ($scope.layout.props) ? $scope.layout.props.layoutMode : null,
                        layoutTemplate: ($scope.layout.props) ? $scope.layout.props.layoutTemplate : null
                    }
                }, function ( newVal, oldVal ) {
                    if ( newVal &&
                        (
                        (newVal.kpiComparison !== oldVal.kpiComparison) ||
                        (newVal.layoutMode !== oldVal.layoutMode) ||
                        (newVal.layoutTemplate !== oldVal.layoutTemplate)
                        )
                    ) {
                        console.log( 'watch kpiComparsion', {newVal: newVal, oldVal: oldVal} );
                        $scope.setStyles();
                    }
                }, true );

                $scope.setStyles();

            }
            ]
        }
            ;

    } )
;
