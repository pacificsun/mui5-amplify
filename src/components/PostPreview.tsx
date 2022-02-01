import { Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Post } from "../API";
import { Box } from "@mui/system";
interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
        style={{ width: "100%", padding: 12, marginTop: 18 }}
      >
        {/* Upvote / votes / downvotes */}
        <Grid item alignItems="center" style={{ maxWidth: 128 }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <ArrowUpwardIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="h6">{(post.upvotes - post.downvotes).toString()}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">vote</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton color="inherit">
                <ArrowDownwardIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {/* Content Preview */}
        <Grid item>
          <Grid container direction="column" alignItems="flex-start">
            <Grid item>
              <Typography variant="body1">
                Posted by <b>{post.owner}</b> at <b>{post.createdAt}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2">{post.title}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
