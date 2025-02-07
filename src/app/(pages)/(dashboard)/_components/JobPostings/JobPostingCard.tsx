import { useState } from "react";
// Services
import { deleteJobPosting, saveJobPosting } from "./_services/jobPostingService";
// Components
import Label from "./Label";
// Utils
import { getLabelColors } from "./_utils/getLabelColor";
// MUI
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface JobListProps {
  id: string;
  title: string;
  url: string;
  experienceLevel: string | undefined;
  location: string | undefined;
  salary: string | undefined;
  jobDescriptionSnippet: string | undefined;
  jobType: string | undefined;
}

const JobPostingCard = ({
  id,
  title,
  url,
  experienceLevel,
  location,
  salary,
  jobDescriptionSnippet,
  jobType,
}: JobListProps) => {
  /*   const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }; */

  const [saved, setSaved] = useState(false);

  const handleSaveJob = (id: string) => {
    saveJobPosting(id);
    setSaved(!saved);
  };

  return (
    <Paper
      elevation={10}
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Card variant="outlined" key={id}>
        <CardHeader
          sx={{
            "& .MuiCardHeader-subheader": {
              marginTop: 0.5,
            },
          }}
          title={
            <Grid container spacing={4}>
              <Grid>
                <a href={url} target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
                  {title}
                </a>

                <IconButton onClick={() => handleSaveJob(id)} color="secondary">
                  {saved ? (
                    <BookmarkIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          }
          subheader={
            <Grid container spacing={2} alignItems="center">
              <Grid>
                <Typography variant="body2" color="text.secondary">
                  {location} {salary}
                </Typography>
              </Grid>
              <Grid container>
                {experienceLevel && experienceLevel !== "Unknown" && (
                  <Grid>
                    <Label title={experienceLevel} colour={getLabelColors(experienceLevel)} />
                  </Grid>
                )}
                {jobType && (
                  <Grid>
                    <Label title={jobType} colour={getLabelColors(jobType)} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          }
        />

        <CardContent>
          <Grid container>
            <Grid container spacing={2} size={8}>
              <Typography>{jobDescriptionSnippet}</Typography>
            </Grid>

            <Grid
              container
              size={4}
              direction="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <div style={{ marginBottom: "1rem" }}>MATCH SCORE VISUAL</div>
              <Button variant="contained" onClick={() => console.log("analyze")}>
                Analyze
              </Button>
            </Grid>
          </Grid>

          {/* 
        <ExpandMoreIcon onClick={handleExpandClick} />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
         TODO: add summary of job description and any other details here AFTER job analyzed by LLM 
        </Collapse> */}
        </CardContent>
        <IconButton
          onClick={() => deleteJobPosting(id)}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <DeleteIcon
            sx={{
              color: "#D32F2F",
              cursor: "pointer",
              "&:hover": {
                color: "darkred",
              },
            }}
          />
        </IconButton>
      </Card>
    </Paper>
  );
};

export default JobPostingCard;
