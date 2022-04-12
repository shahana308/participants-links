/** @format */

import React from "react";
import { useQuery } from "react-query";
import { Button } from "@chakra-ui/react";

import axios from "axios";
import Card from "./Card";
const Example = () => {
  let today = new Date().toISOString();

  const sessions = [
    {
      date: today,
      startTime: "09:00",
      endTime: "20:00",
    },
  ];

  console.log(sessions);
  const body = {
    caseTitle: "Meeting for Jintu",
    caseNumber: 101,
    description:
      "You know, they say all men are created equal, but you look at me and you look at Samoa Joe, and you can see that statement is not true! See, normally if you go one-on-one with another wrestler, you got a 50-50 chance of winnin’. But I’m a genetic freak, and I’m not normal, so you got a 25% at best at beatin’ me! And then you add Kurt Angle to the mix? Your chances of winnin’ drasticy go down. See the three-way, at Sacrifice, you got a 33 1/3 chance of wiinnin’. But I, I got a 66 2/3 chance of winning, cause Kurt Angle KNOWS he can’t beat me, and he’s not even gonna try! So, Samoa Joe, you take your 33 1/3 chance, minus my 25 percent chance, and you got an 8 1/3 chance of winnin’ at Sacrifice! But then you take my 75 perchance chance at winnin’, if we was to go one-on-one, and to add 66 2/3 ch… percents, I got a 141 2/3 chance of winnin at Sacrifice! See, McJoe; the numbers don’t like, and they spell disaster for you at Sacrifice!",
    hearingType: "I am vengence",
    applicationNumber: 2,
    isRecorded: false,
    isPrivate: false,
    sessions: sessions,
    participants: [
      {
        name: "Shavaiz Khan",
        email: "shavaiz@cxunicorn.com",
        partyName: "Others",
        role: "Judge",
        isProminent: false,
      },
      {
        name: "Marcel Malas",
        email: "marcel@cxunicorn.com",
        partyName: "Others",
        role: "Judge",
        isProminent: false,
      },
      {
        name: "Pavithra",
        email: "pavithra@cxunicorn.com",
        partyName: "Defendant",
        role: "PartyMember",
        isProminent: true,
      },
      {
        name: "Karim Hassan",
        email: "karimh@cxunicorn.com",
        partyName: "Claimant",
        role: "PartyMember",
        isProminent: true,
      },

      {
        name: "A PK",
        email: "apk@cxunicorn.com",
        partyName: "Defendant",
        role: "PartyMember",
        isProminent: false,
      },
      {
        name: "Kanika L",
        email: "kanika@cxunicorn.com",
        partyName: "Claimant",
        role: "PartyMember",
        isProminent: false,
      },
    ],
  };
  const headers = {
    Authorization: "Basic YWRtaW46ZkdBdXQzZXRxMmdAR0V5Uw==",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const { isLoading, error, data, refetch } = useQuery(
    "repoData",
    () => {
      return axios.post(
        `http://cx-difc-pinedulev2.azurewebsites.net/api/hearing`,
        body,
        {
          headers: headers,
        }
      );
    },
    {
      refetchOnMount: false,
      //   refetchOnWindowFocus: false,
      //   refetchInterval: 5000,
      //   refetchIntervalInBackground: true,
    }
  );

  if (isLoading) return "Loading...";

  const urls = data.data.participants.map((participant) =>
    participant.joinUrls.map((urls) =>
      urls.url.replace(
        "https://udc-difc-staging.azurewebsites.net/",
        "https://udc-moj-uae-demo.azurewebsites.net/"
      )
    )
  );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Button onClick={refetch}>Refetch Data</Button>
      {data.data.participants.map((participant, id) => (
        <ul key={id}>
          <Card>
            <h3>{participant.name}</h3>
            <a href={urls.map((url) => url)}>{urls.map((url) => url)}</a>
          </Card>
        </ul>
      ))}
    </div>
  );
};

export default Example;
