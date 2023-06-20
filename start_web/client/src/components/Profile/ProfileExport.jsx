// import React from "react";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, Dropdown, Modal, Form } from "react-bootstrap";
import axios from "axios";

import "./Profile.css";

import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

function ProfileExport() {
  const navigate = useNavigate();
  const location = useLocation();
  let profile = location.state;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      padding: 40,
    },
    body: {
      fontFamily: "Helvetica",
      fontSize: 12,
      marginBottom: 10,
    },
    title: {
      fontFamily: "Helvetica",
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 10,
    },
    separator: {
      borderTop: "1px solid #000000",
      marginTop: 20,
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
      fontFamily: "Helvetica",
    },
  });

  const ProfilePDF = ({ profile }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <Text style={styles.body}>
            {profile.firstName + " " + profile.lastName}
          </Text>
          <Text>{profile.email}</Text>
          <Text>{profile.phone}</Text>

          <Text style={styles.title}>Title:</Text>
          <View>
            {profile.titles?.map((title, index) => (
              <Text key={index} style={styles.body}>
                {title}
              </Text>
            ))}
          </View>

          <View style={styles.separator} />

          <Text style={styles.title}>Major:</Text>
          <Text>{profile.major}</Text>

          <View style={styles.separator} />

          <Text style={styles.title}>Focus Areas:</Text>
          <View>
            {profile.focusAreas.map((focusArea, index) => (
              <Text key={index} style={styles.body}>
                {focusArea}
              </Text>
            ))}
          </View>

          <View style={styles.separator} />

          <Text style={styles.title}>Educations:</Text>
          <View>
            {profile.educations.map((education, index) => (
              <Text key={index} style={styles.body}>
                {education}
              </Text>
            ))}
          </View>

          <View style={styles.separator} />

          <Text style={styles.title}>Honors:</Text>
          <View>
            {profile.honors.map((honor, index) => (
              <Text key={index} style={styles.body}>
                {honor}
              </Text>
            ))}
          </View>

          <View style={styles.separator} />

          <Text style={styles.title}>Experiences:</Text>
          <View>
            {profile.experiences.map((experience, index) => (
              <Text key={index} style={styles.body}>
                {experience}
              </Text>
            ))}
          </View>

          <View style={styles.separator} />

          <Text style={styles.title}>Papers:</Text>
          <View>
            {profile.papers.map((paper, index) => (
              <Text key={index} style={styles.body}>
                {paper}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="export-page-container">
      <div className="d-flex justify-content-between">
        <h2 className="ms-5">Export Your Profile</h2>
        {profile && (
          <PDFDownloadLink
            document={<ProfilePDF profile={profile} />}
            fileName="profile"
          >
            <Button className="me-5 export-button">Export to PDF</Button>
          </PDFDownloadLink>
        )}
      </div>

      <div>
        {profile && (
          <PDFViewer className="mt-4 pdf-viewer" fileName="profile">
            <ProfilePDF profile={profile} />
          </PDFViewer>
        )}
      </div>
    </div>
  );
}

export default ProfileExport;
