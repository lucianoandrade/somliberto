import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProgressBar from "../ProgressBar";
import { useFormikContext, useField } from "formik";
import useUpload from "../../../hooks/useUpload";
import EditIcon from "../EditIcon/EditIcon";
import RemoveIcon from "../RemoveIcon/RemoveIcon";
import Avatar from '@material-ui/core/Avatar';
import {default as PlaceholderAvatar} from "../../../assets/img/avatar.png";
// import "./Upload.scss";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    marginBottom: "20px",
    boxShadow: "none",
  },
  large: {
    width: "100px",
    height: "100px"
  },
  uploadButton:{
    justifyContent: "flex-end"
  },
  avatarWrapper: {
    borderRadius: "50%",
    width: "110px",
    height: "110px",
    margin: "0 auto",
    border: "1px solid ",
    display: "flex",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarPlaceholder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "1px solid black"
  },
  addImage: {
    marginTop: "10px",
    fontStyle: "italic",
    textDecoration: "underline",
    color: "#C00000",
    backgroundColor: "transparent",
    border: "0"
  }
}));

export default function Upload(props) {
  const {
    source = "url",
    sourceName = "",
    getUrl = () => {},
    keyImageUrl,
    label
  } = props;
  const [form, setForm] = useState({});
  const [file, setFile] = useState({});
  // const [progress, setProgress] = useState(0);

  const { progress, startUpload, status } = useUpload();

  const formReactAdmin = useFormikContext();
  /* eslint-disable no-unused-vars */
  const [field, _meta, helpers] = useField(keyImageUrl);
  const setValueImageUrl = helpers.setValue;
  const [_fieldSource, _metaSource, helpersSource] = useField(source);
  /* eslint-enable no-unused-vars */
  const setValueSource = helpersSource.setValue;
  const imageUrl = field.value;


  useEffect(() => {
    if (form.url) fileUpload(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  useEffect(() => {
    if (status === "done" && keyImageUrl) {
      setValueImageUrl(form.url + form.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, form]);

  const handleSetFileId = useCallback(
    (fileId, url) => {
      setValueSource(fileId);
    },
    [setValueSource]
  );

  function RemovePicture(){
    setValueImageUrl(null)
    setValueSource(null)
  }

  const classes = useStyles();

  async function getUrlUpload() {
    const response = await getUrl();
    handleSetFileId(response.fields.key, response.url);
    setForm({ ...response.fields, url: response.url });
  }

  function fileUpload(form) {
    // check file type
    // if (
    //   !["image/jpeg", "image/gif", "image/png", "image/svg+xml"].includes(
    //     file.type
    //   )
    // ) {
    //   console.log("Only images are allowed.");
    //   return;
    // }

    // check file size (< 2MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log("File must be less than 5MB.");
      return;
    }

    let formData = new FormData();
    formData.append("key", form.key);
    formData.append("AWSAccessKeyId", form.AWSAccessKeyId);
    formData.append("policy", form.policy);
    formData.append("signature", form.signature);
    formData.append("x-amz-security-token", form["x-amz-security-token"]);
    formData.append("file", file);
    startUpload(form.url, formData);
  }

  function handleChangeFile(e) {
    const file = e.target.files[0] || {};
    sourceName && formReactAdmin.change(sourceName, file.name);
    setFile(file);
    getUrlUpload();
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        <Grid container  alignItems={"center"} justify={"center"}>

          <Grid container item xs={12} alignItems={"center"} justify={"center"}>
            {imageUrl ? (
              <div className={classes.avatarWrapper}>
                <Avatar alt="" src={imageUrl}  className={classes.large} />
              </div>)
              : (
                <div className={classes.avatarPlaceholder}>

                    <img src={PlaceholderAvatar} alt="Avatar"/>
                </div>
              )
            }

          </Grid>

          {status !== "loading" ?

            <Grid  container item xs={12} direction={"column"} justify={"flex-end"} alignItems="center">
              <label className="file-label"> {label} </label>
              <div
                style={{
                  position: "relative",
                  width: "auto",
                  height: "37px",
                  overflow: "hidden",
                  display: "flex"
                }}
              >
                <input
                  id={source}
                  type="file"
                  name="file"
                  onChange={handleChangeFile}
                  style={{
                    position: "absolute",
                    zIndex: -1,
                    opacity: 0
                  }}
                />
              {imageUrl ?
                <>
                <EditIcon>
                  <button type="button"  disabled={status === "loading"}
                    onClick={() => document.getElementById(source).click()}>
                    Alterar foto {status === "loading" && `${progress}%`}
                  </button>
                </EditIcon>
                <RemoveIcon>
                  <button type="button" onClick={RemovePicture}>
                    Remover
                  </button>
                </RemoveIcon>
                </>
              :
                <>

                  <button type="button" className={classes.addImage}  disabled={status === "loading"}
                    onClick={() => document.getElementById(source).click()}>
                    Adicionar imagem {status === "loading" && `${progress}%`}
                  </button>
                </>
              }

              </div>
            </Grid>
        :
          <Grid item xs={6}>
            <ProgressBar progress={progress} />
          </Grid>
        }
        </Grid>
      </Paper>
    </div>
  );
}
