// src/styles.js
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableRow: {
        '&:hover': {
            backgroundColor: '#f5f5f5', // Hover 시 배경 색상 변경
        }
    },
});

export default useStyles;