import discord
import requests
import datetime
import asyncio
import time

running_matches = []
BOT_TOKEN = "MTIxODQwMTQ0ODkwMDE2OTczOQ.GMv3m0.QMBYZksN78YIwHkxtOvsCCpfaUi5c2iShGz10s"
DISCORD_CHANNEL_ID = 1218348787706237121
PANDASCORE_TOKEN = "eUSZFGlDjdGCXEErIfr1l4xGtYPHI2q9bJ-EzV2QX6vVBtVVyvE"

intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)


def fetch_matches():
  while True:
    url = "https://api.pandascore.co/matches?sort=-modified_at&token=" + PANDASCORE_TOKEN
    api_request = requests.get(url)
    try:
      api_request.raise_for_status()
    except requests.exceptions.HTTPError:
      print(requests.exceptions.HTTPError)
    else:
      return api_request.json()
    time.sleep(10)


async def check_for_updated_matches(cached_matches):
  updated_match_list = fetch_matches()
  updated_matches = [
    updated_match for updated_match in updated_match_list if compare_date(
      updated_match["modified_at"], cached_matches[0]["modified_at"])
  ]
  return updated_matches


def compare_date(date1, date2):
  date1_dt = datetime.datetime.strptime(date1, '%Y-%m-%dT%H:%M:%SZ')
  date2_dt = datetime.datetime.strptime(date2, '%Y-%m-%dT%H:%M:%SZ')
  return date1_dt > date2_dt


def running_match_message(match):
  default_msg = match['name'] + " has started!"
  stream_list = match['streams_list']
  if stream_list == []:
    return default_msg
  else:
    return (default_msg + " Watch live at " + stream_list[0]['raw_url'])


def finished_match_message(match):
  default_msg = match['name'] + " has finished! Final score is " + str(
    match['results'][0]['score']) + " - " + str(match['results'][1]['score'])
  if match["draw"]:
    return (default_msg)
  else:
    return (default_msg + ". Winner team is " + match['winner']['name'])

def main():

  @client.event
  async def on_ready():
    print(f'Logged in as {client.user} (ID: {client.user.id})')
    await match_lifecycle_updates()

  async def match_lifecycle_updates():
    cached_matches = fetch_matches()
    while True:
      updated_matches = await check_for_updated_matches(cached_matches)
      channel = client.get_channel(DISCORD_CHANNEL_ID)
      if len(updated_matches) > 0:
        for updated_match in updated_matches:
          match_status = updated_match["status"]
          match_id = updated_match["id"]

          if match_status == "running" and match_id not in running_matches:
            await channel.send(running_match_message(updated_match))
            running_matches.append(match_id)

          elif match_status == "finished" and match_id in running_matches:
            await channel.send(finished_match_message(updated_match))
            running_matches.remove(match_id)

        cached_matches = fetch_matches()
      await asyncio.sleep(10)

  client.run(BOT_TOKEN)


main()