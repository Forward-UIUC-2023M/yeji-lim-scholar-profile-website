const mongoose = require("mongoose");
const Profiles = require("./Profile");

const ProfilesSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  links: {
    type: [String],
  },
  keywords: {
    type: [String],
    // default: ["no keywords"],
    default: [
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
      "keyword",
    ],
  },
  email: {
    type: String,
    default: "defaultemail@gmail.com",
  },
  phone: {
    type: String,
    default: "123-456-7890",
  },
  educations: {
    type: [String],
    // default: "no edu",
    default: [
      "Ph.D. Electrial Engineering, Stanford University, 2005",
      "B.S. Computer Science, University of Pittsburgh, Pittsburgh, Pennsylvania, 1995",
    ],
  },
  institution: {
    type: String,
    default: "University of Illinois at Urbana-Champaign",
  },
  titles: {
    type: [String],
    default: ["Professor", "Chair of Something Organization"],
  },
  major: {
    type: String,
    default: "Computer Science",
  },
  focusAreas: {
    type: [String],
    // default: ["None"],
    default: ["Artificial Intelligence", "Machine Learning", "Big Data"],
  },
  honors: {
    type: [String],
    // default: ["no honors"],
    default: [
      "PC Members, SIGMOD, VLDB, ICDE, KDD, EDBT, ICDM, WWW, ASONAM, SIGIR, WSDM, CIKM, AAAI, Recent years.",
      "Workshop Co-chair, 31st IEEE International Conference on Data Engineering (ICDE 2015), 2014 - 2015.",
      "Associate Editor, Proceedings of the VLDB Endowment (PVLDB), 2014 - 2015.",
      "Area Editor, Encyclopedia of Database Systems, 2014 - 2016.",
      "Workshop Co-chair, 22rd International World Wide Web Conference (WWW 2014), 2013 - 2014.",
      "PC Co-chair, Track “Bringing Unstructured and Structured Data”, 2012 - 2013.",
      "Best Paper Award Committee, ACM International Conference on Web Search and Data Mining, 2012.",
      "Senior PC, ACM International Conference on Web Search and Data Mining, 2011.",
      "Co-chair, Demonstration Track, ICDE 2011, 2011.",
      "Senior PC, ACM SIGKDD Conference on Knowledge Discovery and Data Mining, 2010.",
      "Area Editor, Encyclopedia of Database Systems, 2007 - 2009.",
      "Workshop Chair, APWeb 2007, 2007.",
    ],
  },
  experiences: {
    type: [String],
    // default: ["no experiences"],
    default: [
      "Steering Committee, International Workshop on Information Integration on the Web (IIWeb 2007) at AAAI, 2007.",
      "Workshop Chair, ACM SIGMOD 2006 Conference, 2006.",
      "Co-chair, International Workshop on Information Integration on the Web (IIWeb 2006) at WWW, 2006.",
      "Co-chair, International Workshop on Challenges in Web Information Retrieval and Integration (WIRI 2006) at ICDE, 2006.",
      "Guest Editor, SIGKDD Explorations 6(2) Special Issue on Web Content Mining, 2004.",
      "Chair, NSF DIMACS Center Tutorial/Summer School on Social Choice and Computer Science, 2004.",
      "Steering Committee, International Workshop on Information Integration on the Web (IIWeb 2007) at AAAI, 2007.",
      "Workshop Chair, ACM SIGMOD 2006 Conference, 2006.",
      "Co-chair, International Workshop on Information Integration on the Web (IIWeb 2006) at WWW, 2006.",
      "Co-chair, International Workshop on Challenges in Web Information Retrieval and Integration (WIRI 2006) at ICDE, 2006.",
      "Guest Editor, SIGKDD Explorations 6(2) Special Issue on Web Content Mining, 2004.",
      "Chair, NSF DIMACS Center Tutorial/Summer School on Social Choice and Computer Science, 2004.",
    ],
  },
  papers: {
    type: [String],
    // default: ["no papers"],
    default: [
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
      "Mobility Profiling for User Verification with Anonymized Location Data. M. Lin, H. Cao, V. Zheng, K. C.-C. Chang, and S. Krishnaswamy. In International Joint Conference on Artificial Intelligence (IJCAI 2015), 2015.",
    ],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Profiles", ProfilesSchema);
