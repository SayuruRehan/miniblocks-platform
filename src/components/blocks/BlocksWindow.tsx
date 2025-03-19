import {BlocklyWorkspace, WorkspaceSvg} from "react-blockly";
import {useAppStore} from '../../store';
import {useState} from "react";
import "./customBlocks/custom_Blocks";
import {flutterCategory, ToolboxCategory} from "../../categories/flutter.ts";
import {dartGenerator} from "blockly/dart";
import {ComponentTree} from "../design/ComponentTree.tsx";
import {Minimap} from '@blockly/workspace-minimap';
import {Backpack} from '@blockly/workspace-backpack';
import {WorkspaceSearch} from '@blockly/plugin-workspace-search';
import "@blockly/toolbox-search";
import CustomCategory from "../../themes/toolbox/customCats.tsx";
import {LogicTheme} from "../../themes/logicTheme.tsx";

export const BlocksWindow = () => {
    const {debugMode, advanceMode} = useAppStore();
    const [dartCode, setDartCode] = useState("");

    const baseContents: ToolboxCategory[] = [
        {
            kind: "search",
            name: "Search",
            contents: [],
        },
        {
            kind: "sep",
            blockxml:
                "<block type='math_arithmetic'><field name='OP'>ADD</field></block>",
            gap: 10,
        },
    ];

    if (advanceMode) {
        baseContents.push(flutterCategory);
    }

    const toolboxCategories = {
        kind: "categoryToolbox",
        contents: baseContents,
    };

     const workspaceConfiguration = {
        theme: LogicTheme,
        // renderer: "custom_renderer",
        toolbar: CustomCategory,
        grid: {
            spacing: 20,
            length: 3,
            colour: "#a1caff",
            snap: true,
        },
        zoom: {
            controls: true,
            wheel: true,
            startScale: 0.8,
            maxScale: 3,
            minScale: 0.1,
            scaleSpeed: 1.2,
            pinch: true,
            trashcan: true,
        },
        toolboxConfiguration: {
            hidden: true, // Hide the toolbox
        },
    };

    function workspaceDidChange(workspace: WorkspaceSvg) {
        const code = dartGenerator.workspaceToCode(workspace);
        setDartCode(code);
    }

    function handleWorkspaceInjected(workspace: WorkspaceSvg) {
        const minimap = new Minimap(workspace);
        minimap.init();

        const backpack = new Backpack(workspace);
        backpack.init();

        const workspaceSearch = new WorkspaceSearch(workspace);

        workspaceSearch.init();
    }

    return (
        <>
            <div className="flex-1 flex">
                <div className="w-64 bg-white border-r flex flex-col">
                    <ComponentTree/>
                </div>
            </div>
            <BlocklyWorkspace
                toolboxConfiguration={toolboxCategories}
                className="[h-screen-100px] w-screen"
                workspaceConfiguration={workspaceConfiguration}
                onWorkspaceChange={workspaceDidChange}
                onInject={handleWorkspaceInjected}
            />
            {debugMode && (
                <textarea
                    id="code"
                    style={{height: "[h-screen-200px]", width: "400px"}}
                    value={dartCode}
                    readOnly
                ></textarea>
            )}
        </>
    );
};