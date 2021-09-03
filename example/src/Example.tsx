import { AppBar, Tab, Tabs, Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export interface ExampleProps {
    text: string;
    title: string;
}

const Example: React.FC<ExampleProps> = ({ text, title, children }) => {
    const [currentTab, setCurrentTab] = useState<number>(0);
    return (
        <div>
            <Typography variant="h2">
                {title}
            </Typography>
            <AppBar position="sticky" color="default">
                <Tabs value={currentTab} onChange={(event, i) => setCurrentTab(i)}>
                    <Tab label="Demo" />
                    <Tab label="Code" />
                </Tabs>
            </AppBar>
            <Box padding="50px" border="1px solid lightgrey">
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
        </div>
    );
};

export default Example;