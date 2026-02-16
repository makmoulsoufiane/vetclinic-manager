import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';

const Table = ({ columns, data, actions }) => {
  return (
    <TableContainer>
      <MuiTable size="small">
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCell key={idx}>{col.header}</TableCell>
            ))}
            {actions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center">
                <Typography color="text.secondary">Aucune donnée disponible</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col, colIdx) => (
                  <TableCell key={colIdx}>
                    {col.render ? col.render(row) : row[col.field]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {actions(row)}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
