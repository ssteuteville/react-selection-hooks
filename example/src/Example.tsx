import { AppBar, Tab, Tabs, Box } from '@material-ui/core';
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export interface ExampleProps {
    text: string;
}

const Example: React.FC<ExampleProps> = ({ text, children }) => {
    const [currentTab, setCurrentTab] = useState<number>(0);
    return (
        <Box>
            <AppBar position="sticky">
                <Tabs value={currentTab} onChange={(event, i) => setCurrentTab(i)}>
                    <Tab label="Demo" />
                    <Tab label="Code" />
                </Tabs>
            </AppBar>
            {
                currentTab === 0 && children
            }
            {
                currentTab === 1 && (
                    <SyntaxHighlighter language="ts">
                        {text}
                    </SyntaxHighlighter>
                )
            }
        </Box>
    );
};

export default Example;