define( [
    'text!./config/layouts.json'
], function ( layouts ) {
    'use strict';

    // ****************************************************************************************
    // KPI data
    // ****************************************************************************************

    var kpiTitle = {
        ref: "props.kpiTitle",
        label: "KPI title",
        type: "string",
        expression: "optional"
    };

    var kpi = {
        ref: "props.kpi",
        label: "KPI",
        type: "string",
        expression: "optional"
    };

    var kpiComparisonLabel = {
        ref: "props.kpiComparisonLabel",
        label: "KPI comparison (displayed value)",
        type: "string",
        expression: "optional"
    };

    var kpiComparison = {
        ref: "props.kpiComparison",
        label: "KPI comparison (numeric value)",
        type: "number",
        expression: "optional"
    };

    // ****************************************************************************************
    // General Layout Settings
    // ****************************************************************************************

    var layoutMode = {
        ref: "props.layoutMode",
        label: "Layout",
        type: "string",
        component: "radiobuttons",
        options: [
            {
                value: "default",
                label: "Default Layout"
            },
            {
                value: "custom",
                label: "Custom Layout"
            },
            {
                value: "template",
                label: "Template"
            }
        ],
        defaultValue: "default"
    };

    var options = [];
    _.map( JSON.parse( layouts ), function ( item, key ) {
        var o = {
            value: key,
            label: item.name
        };
        options.push( o );
    } );

    var layoutTemplate = {
        ref: "props.layoutTemplate",
        label: "Template",
        type: "string",
        component: "dropdown",
        options: options,
        defaultValue: "default",
        show: function ( data ) {
            return data.props && data.props.layoutMode && data.props.layoutMode === 'template';
        }

    };

    // ****************************************************************************************
    // Custom Layout
    // ****************************************************************************************

    var tileBackgroundColor = {
        ref: "props.tileBackgroundColor",
        label: "Tile background color",
        type: "string",
        expression: "optional",
        show: function ( data ) {
            return data.props && data.props.layoutMode === 'custom';
        }
    };

    var titleColor = {
        ref: "props.titleColor",
        label: "Title color",
        type: "string",
        expression: "optional",
        show: function ( data ) {
            return data.props && data.props.layoutMode === 'custom';
        }
    };

    var titleFontSize = {
        ref: "props.titleFontSize",
        label: "Title Font Size",
        type: "number",
        expression: "optional",
        show: function ( data ) {
            return data.props && data.props.layoutMode === 'custom';
        }
    };

    var kpiColor = {
        ref: "props.kpiColor",
        label: "KPI color",
        type: "string",
        expression: "optional",
        show: function ( data ) {
            return data.props && data.props.layoutMode === 'custom';
        }

    };

    var kpiFontSize = {
        ref: "props.kpiFontSize",
        label: "KPI Font Size",
        type: "number",
        expression: "optional",
        show: function ( data ) {
            return data.props && data.props.layoutMode === 'custom';
        }
    };

    var comparisonColor = {
        ref: "props.comparisonColor",
        label: "Comparison color",
        type: "string",
        expression: "optional",
        show: function ( data ) {
            return data.props && data.props.layoutMode === 'custom';
        }

    };

    var comparisonSymbol = {
        ref: "props.comparisonSymbol",
        label: "Comparison symbol",
        type: "string",
        expression: "optional",
        show: function ( data ) {
            // return data.props && data.props.layoutMode === 'custom';
            return data.props;
        }
    };

    var comparisonFontSize = {
        ref: "props.comparisonFontSize",
        label: "Comparison Font Size",
        type: "number",
        expression: "optional",
        show: function ( data ) {
            return data.props && data.props.layoutMode === 'custom';
        }
    };

    // ****************************************************************************************
    // Property Panel Definition
    // ****************************************************************************************

    // Return values
    return {
        type: "items",
        component: "accordion",
        items: {
            data: {
                label: "Data",
                items: {
                    kpiTitle: kpiTitle,
                    kpi: kpi,
                    kpiComparison: kpiComparison,
                    kpiComparisonLabel: kpiComparisonLabel
                }
            },
            appearance: {
                label: "Appearance",
                items: {
                    layoutMode: layoutMode,
                    layoutTemplate: layoutTemplate,
                    tileBackgroundColor: tileBackgroundColor,
                    titleColor: titleColor,
                    titleFontSize:titleFontSize,
                    kpiFontSize:kpiFontSize,
                    comparisonFontSize:comparisonFontSize,
                    kpiColor: kpiColor,
                    comparisonColor: comparisonColor,
                    comparisonSymbol:comparisonSymbol
                }
            }
        }
    };

} );
