import React, { useState } from "react";
import { useTickets } from "../hooks/useTickets";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FormField } from "../components/common/FormField";
import { issueType } from "../utils/options";

export default function ITRequestPage() {
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    file: null,
  });
  const [errors, setErrors] = useState({
    issueType: "",
    description: "",
  });
  const [touched, setTouched] = useState({
    issueType: false,
    description: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const { addTicket } = useTickets("1");
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "issueType":
        return value ? "" : "Please select an issue type";
      case "description":
        return value.trim() ? "" : "Please describe your issue";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const validateForm = () => {
    const newErrors = {
      issueType: validateField("issueType", formData.issueType),
      description: validateField("description", formData.description),
    };
    setErrors(newErrors);
    setTouched({
      issueType: true,
      description: true,
    });
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      await addTicket({
        issueType: formData.issueType,
        description: formData.description,
      });
      navigate("/tickets");
    } catch (err) {
      setFormError(err.message || "Failed to submit ticket");
      document.querySelector('[role="alert"]')?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4 }}
      component="main"
      aria-labelledby="page-title"
    >
      <Typography
        id="page-title"
        variant="h4"
        gutterBottom
        sx={{ fontWeight: { xs: 500, md: 600 } }}
        tabIndex={-1}
      >
        Submit IT Request
      </Typography>

      {formError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
        >
          {formError}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        aria-label="IT Request Form"
        noValidate
      >
        <FormField
          type="select"
          label="Issue Type"
          name="issueType"
          id="issueType"
          value={formData.issueType}
          onChange={handleChange}
          onBlur={handleBlur}
          options={issueType}
          required
          error={Boolean(errors.issueType)}
          helperText={errors.issueType}
          aria-describedby={errors.issueType ? "issueType-error" : undefined}
          aria-invalid={Boolean(errors.issueType)}
          inputProps={{
            "aria-required": true,
          }}
        />

        <FormField
          type="multiline"
          label="Description"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={4}
          error={Boolean(errors.description)}
          helperText={errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          aria-invalid={Boolean(errors.description)}
          inputProps={{
            "aria-required": true,
          }}
        />

        <Box mt={2} mb={3}>
          <FormField
            type="file"
            label="Upload File"
            name="file"
            accept="image/*,.pdf,.doc,.docx"
            selectedFile={formData.file}
            onFileChange={handleFileChange}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={20} /> : null}
          sx={{
            "&:focus": {
              outline: "3px solid",
              outlineColor: "primary.main",
              outlineOffset: "2px",
            },
          }}
          aria-live="polite"
          aria-busy={submitting}
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </Button>
      </Box>
    </Container>
  );
}
