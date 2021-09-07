
import gql from "graphql-tag";

export const Self_EDIT = gql`
mutation($name:String!,$age:String!,$imageURI:String!) {
    editSelf(
        input: 
        {
            name: $name,
            age: $age,
            imageURI: $imageURI,
        }
        ) {
               id
               name
               age
               gitHub
               imageURI
           }  
  }`;

export const Kid_QUERY = gql`
{
    self {
        id
        name
        age
        gitHub
        imageURI
    }
   }`;
   
export const Login_AccessToken = gql`
mutation($code:String!) {
    login(
        input: 
        {
            code: $code
        }
        ) {
           kid{
               id
           }
           jwt
    }
  }`;

export const Selfinfo_QUERY = gql`
{
    self {
        id
        name
        age
        gitHub
        imageURI
    }
   }`;

export const Add = gql`
mutation($content:String!,$language:String!,$imageURI:String!) {
    addStudy(input: { content: $content, language: $language,imageURI: $imageURI}) {
        id
        content
        language
        imageURI
      }
  }`;

  export const Update = gql`
mutation($studyId:ID!,$content:String!,$language:String!,$imageURI:String!) {
    editStudy(input: {studyId:$studyId,content: $content, language: $language,imageURI: $imageURI}) {
        content
        language
        imageURI
        id
      }
  }`;

  export const Delete = gql`
  mutation($studyId:ID!) {
      delStudy(input: {studyId:$studyId}) {
          id
        }
    }`;