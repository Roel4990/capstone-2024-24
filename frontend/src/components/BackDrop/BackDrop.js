import React from 'react';
import { useRecoilState } from 'recoil';
import { backdropState } from '../../recoil/atoms.js';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 2000,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
}));
export function SimpleBackdrop() {
    const [isOpen, setIsOpen] = useRecoilState(backdropState);
    const classes = useStyles();
    if (!isOpen) return null;
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        // <div
        //     // onClick={() => setIsOpen(false)}
        //     style={{
        //     position: 'fixed',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //     zIndex: 2000, // zIndex는 다른 요소들보다 높아야 함
        // }} />
        <Backdrop className={classes.backdrop} open={isOpen}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}