import React from 'react';
import {Grid, Cell} from 'react-foundation';

const Spinner = () => (
    <Grid className="loader-box align-center-middle text-center">
        <Cell className="shrink">
            <div className="loader"></div>
        </Cell>
    </Grid>
);

export default Spinner;
