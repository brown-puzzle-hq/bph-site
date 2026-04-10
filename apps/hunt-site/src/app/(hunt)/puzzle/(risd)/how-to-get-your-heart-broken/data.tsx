import Image from "next/image";
import map from "./meme.png";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "how-to-get-your-heart-broken";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <div className="mb-1 text-xl font-bold">
        Linden Mann (She/her, Gemini)
      </div>
      <b>You:</b> Hi! I'm glad we matched. You're actually my first match here.
      <br /> <b>Linden:</b> I don't like winning… but I suppose I'll make an
      exception this time :)
      <br /> <b>You:</b> I saw on your profile that you play instruments?
      <br /> <b>Linden:</b> Oh no, I'm not in some orchestra or anything. I'm a
      singer.
      <br /> <b>You:</b> Nice! Do you write your own songs too?
      <br /> <b>Linden:</b> Not really. Songwriting is exhausting. Sitting
      around thinking of rhymes and themes… I'd rather be on stage. I hate
      standing in the background.
      <br /> <b>You:</b> Fair enough. Performing sounds exciting.
      <br /> <b>Linden:</b> It is. When the spotlight hits and everyone's
      looking at you… that's the best feeling.
      <br /> <b>You:</b> Sounds like you love the stage.
      <br /> <b>Linden:</b> Obviously. I'm planning to win a Grammy in two
      years.
      <br /> <b>You:</b> Two years?
      <br /> <b>Linden:</b> I work on my new album every single day.
      <br /> <b>You:</b> Wait, didn't you say you don't like writing lyrics?
      <br /> <b>Linden:</b> Well… rehearsing, recording, arranging… music stuff.
      Don't get technical.
      <br /> <b>You:</b> Your dedication is impressive. You must have a lot of
      fans.
      <br /> <b>Linden:</b> Honestly? I have more haters than fans.
      <br /> <b>You:</b> Really?
      <br /> <b>Linden:</b> There's this one guy who keeps showing up to my
      performances and complaining about the sound system. Always talking about
      acoustics.
      <br /> <b>You:</b> Sounds annoying.
      <br /> <b>Linden:</b> You can't imagine.
      <br /> <b>You:</b> So what do you do in your free time?
      <br /> <b>Linden:</b> I like fashion, putting outfits together. And I love
      going out for ice cream.
      <br /> <b>You:</b> Favorite flavor?
      <br /> <b>Linden:</b> Hazelnut or chocolate.
      <br /> <b>You:</b> But your profile says you're allergic to nuts…
      <br /> <b>Linden:</b> It's not that serious.
      <br /> <b>You:</b> Are you sure?
      <br /> <b>Linden:</b> Ask Simon, he always gets ice cream with me. He'd
      confirm.
      <br /> <b>You:</b> Who's Simon?
      <br /> <b>Linden:</b> I heard he joined this app recently. He's…
      interesting.
      <br /> <b>You:</b> How so?
      <br /> <b>Linden:</b> He plans everything. And I mean literally
      everything. Spreadsheets, calendars, reminders for reminders.
      <br /> <b>You:</b> Wow.
      <br /> <b>Linden:</b> When we meet up I usually let him add the plan to my
      calendar so he doesn't panic about timing.
      <br /> <b>You:</b> Sounds intense.
      <br /> <b>Linden:</b> Once he literally left in the middle of our walk
      because his calendar said it was time to check an online auction.
      <br /> <b>You:</b> What auction?
      <br /> <b>Linden:</b> Yeah, he collects this old crap. Don't mention it to
      him or he won't shut up about it.
      <br /> <b>You:</b> That's pretty niche.
      <br /> <b>Linden:</b> He's not a bad guy though. Just a little… anxious.
      Okay, I gotta go, I have to keep working on my album. But I'm not writing
      my own music, just keep that in mind. I also have a meeting with all the
      community members later today. I should walk out early to enjoy the North
      Walk without bumping into my annoying neighbour.
      <br /> <b>You:</b> Sure, good luck! Hope to talk to you later!
    </div>
    <div className="mb-4 mt-5 space-y-4">
      <div className="mb-1 text-xl font-bold">
        Erika Athelhere (She/her, Gemini)
      </div>
      <b>Erika:</b> Good morning!
      <br /> <b>You:</b> Hi! What have you been up to?
      <br /> <b>You:</b> Hello? Are you here?
      <br /> <b>You:</b> Erika?
      <br /> <b>Erika:</b> Yes!
      <br /> <b>You:</b> Oh, hi! What have you been up to?
      <br /> <b>Erika:</b> I was out running.
      <br /> <b>You:</b> Oh! Sorry if I interrupted.
      <br /> <b>Erika:</b> It's fine. I'm just a bad texter.
      <br /> <b>You:</b> So you run a lot?
      <br /> <b>Erika:</b> Almost every morning. It helps me start the day
      right.
      <br /> <b>You:</b> That's impressive. I run sometimes too, but usually on
      a treadmill.
      <br /> <b>Erika:</b> Treadmills are fine I guess.
      <br /> <b>You:</b> I usually set the incline to like six or seven and run
      for 30 min
      <br /> <b>Erika:</b> Six seven lol
      <br /> <b>You:</b> Fair point 😂
      <br /> <b>You:</b> So what are you doing next?
      <br /> <b>You:</b> Are you here?
      <br /> <b>Erika:</b> Getting a ballerina cappuccina.
      <br /> <b>You:</b> Wait… what?
      <br /> <b>Erika:</b> It's Italian brainrot.
      <br /> <b>You:</b> Ohhh okay.
      <br /> <b>You:</b> Did you have breakfast already?
      <br /> <b>Erika:</b> Yeah. Some chimpanzini bananini.
      <br /> <b>You:</b> I guess you spend a lot of time online?
      <br /> <b>Erika:</b> My friends send me tiktoks and reels all the time.
      It's a lifestyle.
      <br /> <b>You:</b> Haha I'm also quite chronically online.
      <br /> <b>You:</b> By the way, you have an interesting last name.
      <br /> <b>Erika:</b> Yeah. It comes from some English royalty.
      <br /> <b>You:</b> Really?
      <br /> <b>Erika:</b> My friends like to add royal titles when they text
      me.
      <br /> <b>You:</b> That's funny.
      <br /> <b>You:</b> So what other hobbies do you have besides running?
      <br /> <b>You:</b> Erika?
      <br /> <b>You:</b> Erika?
      <br /> <b>Erika:</b> Yes.
      <br /> <b>You:</b> Yes what?
      <br /> <b>Erika:</b> Do you like animals?
      <br /> <b>You:</b> Yeah! I have two cats.
      <br /> <b>Erika:</b>{" "}
      <Image src={map} alt="A meme of a computer patting a cat" />
      <br /> <b>You:</b> Haha. Do you have any pets?
      <br /> <b>You:</b> Erika?
      <br /> <b>You:</b> Erika?
      <br /> <b>Erika:</b> I actually have to go. Have a meeting kinda far. They
      never care to set a location closer.
    </div>
    <div className="mb-4 mt-5 space-y-4">
      <div className="mb-1 text-xl font-bold">
        Blue de Campi (She/her, Cancer)
      </div>
      <b>You:</b> I love your hair!!!
      <br /> <b>Blue:</b> Thank you! Totally natural, obviously ;)
      <br /> <b>You:</b> Sure, sure. I believe you.
      <br /> <b>Blue:</b> Good. I try not to disappoint people. So tell me… are
      you more of a day person or a night person?
      <br /> <b>You:</b> Probably night. I like going on night walks and
      listening to music.
      <br /> <b>Blue:</b> Same! Nights are the best. Everything's quiet and the
      sky is clear.
      <br /> <b>You:</b> You sound like you spend a lot of time outside.
      <br /> <b>Blue:</b> I like wandering around at night sometimes. Finding a
      quiet spot, laying in the grass… you notice a lot of things if you
      actually look up.
      <br /> <b>You:</b> I don't know much about the sky though.
      <br /> <b>Blue:</b> That's okay. I can point out a few things. I've
      learned a bit about stars over time.
      <br /> <b>You:</b> That sounds fun.
      <br /> <b>Blue:</b> I used to go on hikes every week with Grant actually,
      but… yeah, not anymore.
      <br /> <b>You:</b> Oh? What happened?
      <br /> <b>Blue:</b> I just couldn't deal with it. Every conversation
      turned into this weird interrogation.
      <br /> <b>You:</b> What do you mean?
      <br /> <b>Blue:</b> He'd pressure me to admit I said things I never said.
      Then he'd twist my words and act like I hurt him somehow. And in the end
      everything would become my fault.
      <br /> <b>You:</b> That sounds exhausting.
      <br /> <b>Blue:</b> It really was. After hanging out with him I'd replay
      every conversation in my head wondering what I did wrong.
      <br /> <b>You:</b> I'm sorry you had to deal with that.
      <br /> <b>Blue:</b> It's fine. I'd rather talk about something nicer.
      <br /> <b>You:</b> Sure! I saw on your profile that you're a barista.
      <br /> <b>Blue:</b> Yep. At a bakery actually. I make coffee all day.
      <br /> <b>You:</b> So you must love coffee.
      <br /> <b>Blue:</b> Honestly? I kind of hate it now. When you smell
      espresso for eight hours straight it loses its charm.
      <br /> <b>You:</b> Fair point. Maybe tea then?
      <br /> <b>Blue:</b> Ugh… no. My ex worked at a boba shop so I had enough
      tea for a lifetime.
      <br /> <b>You:</b> Oh, what happened between you two?
      <br /> <b>Blue:</b> Nothing serious. He just got mad at me for no reason
      and blocked me.
      <br /> <b>You:</b> That's rough.
      <br /> <b>Blue:</b> Yeah… well, maybe he had his reasons. People get
      weirdly sensitive sometimes.
      <br /> <b>You:</b> I see.
      <br /> <b>Blue:</b> Anyway! That's in the past. Now we matched, so things
      are already looking better :)
      <br /> <b>Blue:</b> Wait, I'll text you later. I have to go to this stupid
      meeting. It's like a block away, but I need to close the cafe beforehand.
    </div>
    <div className="mb-4 mt-5 space-y-4">
      <div className="mb-1 text-xl font-bold">
        Grant Granoff (He/they, Aries)
      </div>
      <b>Grant:</b> Hey, beautiful. Your profile caught my eye. I usually only
      match with people who get art iykyk :)
      <br /> <b>You:</b> Oh wow, hi! What kind of art are you into?
      <br /> <b>Grant:</b> A bit of everything. Writing, photography… Lately
      I've been doing a lot of street photography. Capturing real moments.
      <br /> <b>You:</b> That sounds cool! Do you have a portfolio?
      <br /> <b>Grant:</b> I do. Though most people don't really understand
      photography. Do you know much about it?
      <br /> <b>You:</b> I've done some photography for friends and family.
      <br /> <b>Grant:</b> Oh, so like casual stuff.
      <br /> <b>You:</b> Actually I was invited to photograph a wedding once.
      <br /> <b>Grant:</b> Hm. Weddings are pretty easy gigs though.
      <br /> <b>You:</b> I guess? Anyway, what else are you into?
      <br /> <b>Grant:</b> Music. But real music. Not the way most people listen
      to it.
      <br /> <b>You:</b> What do you mean?
      <br /> <b>Grant:</b> Headphones ruin everything. Producers spend hours
      perfecting the soundstage, and then people flatten it with cheap
      headphones.
      <br /> <b>You:</b> Oh wow, I listen with headphones all the time.
      <br /> <b>Grant:</b> Yeah… most people do. They just don't know any
      better.
      <br /> <b>You:</b> So how do you listen?
      <br /> <b>Grant:</b> I have a full setup. Studio monitors, DAC, the whole
      thing. It's the only way to hear music the way it's supposed to sound.
      <br /> <b>You:</b> That sounds intense.
      <br /> <b>Grant:</b> I'm just passionate about it.
      <br /> <b>Grant:</b> By the way… you've probably matched with Linden
      already, right?
      <br /> <b>You:</b> Yeah, I talked to her earlier.
      <br /> <b>Grant:</b> What did you think?
      <br /> <b>You:</b> She seemed nice. Really passionate about what she does.
      <br /> <b>Grant:</b> Of course she seemed nice. She's good at that. But
      she lies constantly. Don't trust anything she says.
      <br /> <b>You:</b> Oh… what happened?
      <br /> <b>Grant:</b> She's new here but acts like she owns the place.
      Tells people all these stories about herself. None of them add up. And the
      way she plays piano… My ears start to bleed.
      <br /> <b>You:</b> She told me she's a singer.
      <br /> <b>Grant:</b> Of course she did. Her singing is even worse than her
      piano skills.
      <br /> <b>You:</b> Maybe you two just got off on the wrong foot.
      <br /> <b>Grant:</b> Wow. So you're taking her side already.
      <br /> <b>You:</b> I'm not taking sides.
      <br /> <b>Grant:</b> You basically just said I'm lying.
      <br /> <b>You:</b> I didn't say that.
      <br /> <b>Grant:</b> You didn't have to. I can tell what people mean.
      <br /> <b>You:</b> I think you're reading into it a bit.
      <br /> <b>Grant:</b> See, this is what people do. They twist my words and
      then say I'm the problem.
      <br /> <b>You:</b> I'm not twisting anything.
      <br /> <b>Grant:</b> Relax. You're getting really sensitive about this.
      <br /> <b>You:</b> I'm just trying to understand.
      <br /> <b>Grant:</b> Don't be so dramatic. I haven't said anything wrong.
      Let's talk when you calm down.
      <br /> <b>Grant:</b> I have to be somewhere soon anyway. Deal with Linden
      and all those joyful people jumping around.
    </div>
    <div className="mb-4 mt-5 space-y-4">
      <div className="mb-1 text-xl font-bold">
        Simon Li (He/him, Sagittarius)
      </div>
      <b>Simon:</b> Hi :) This is actually my first time using an app like this,
      so I'm not really sure what I'm supposed to say.
      <br /> <b>You:</b> No worries. I've actually heard a little about you
      already!
      <br /> <b>Simon:</b> Oh… I'm not sure if that's a good thing or a bad
      thing. What did you hear?
      <br /> <b>You:</b> Linden told me you two sometimes get ice cream
      together.
      <br /> <b>Simon:</b> Oh yeah 😂 we do. She's the only person I know who
      likes mint ice cream as much as I do.
      <br /> <b>You:</b> Really? She told me she likes hazelnut and chocolate.
      <br /> <b>Simon:</b> That can't be right. She's allergic to nuts.
      <br /> <b>Simon:</b> Also cinnamon. Coffee makes her really irritable, so
      she avoids that too. And she doesn't eat seafood.
      <br /> <b>You:</b> Wow… you know a lot about her.
      <br /> <b>Simon:</b> I keep notes like that for most people I know.
      <br /> <b>You:</b> Notes?
      <br /> <b>Simon:</b> Just small lists. Allergies, preferences, schedules.
      It helps avoid unexpected situations.
      <br /> <b>You:</b> That's… actually kind of thoughtful.
      <br /> <b>Simon:</b> Maybe. I just prefer knowing things in advance.
      Surprises make me nervous.
      <br /> <b>You:</b> So you don't like surprises?
      <br /> <b>Simon:</b> Not really… unless they're planned beforehand.
      <br /> <b>You:</b> Then it's not really a surprise anymore.
      <br /> <b>Simon:</b> True, but it removes the uncertainty.
      <br /> <b>You:</b> Fair enough. What do you like to do in your free time?
      <br /> <b>Simon:</b> I organize things. I keep records of every movie,
      book, and show I watch.
      <br /> <b>You:</b> That's dedication.
      <br /> <b>Simon:</b> I also collect things.
      <br /> <b>You:</b> Like what?
      <br /> <b>Simon:</b> Well last week I finally bought a doubled-die Lincoln
      cent on eBay. I've been looking for one for a long time.
      <br /> <b>You:</b> What's special about that one?
      <br /> <b>Simon:</b> It's a minting error. The design was stamped slightly
      misaligned, which created a doubled image.
      <br /> <b>You:</b> So you like errors when they happen to coins?
      <br /> <b>Simon:</b> I guess errors are easier to accept when you can
      categorize them.
      <br /> <b>You:</b> That makes sense.
      <br /> <b>Simon:</b> I also enjoy math and physics. Structured things.
      <br /> <b>You:</b> Very STEM of you.
      <br /> <b>Simon:</b> Probably.
      <br /> <b>Simon:</b> Blue actually tried to get me to go hiking with her
      recently.
      <br /> <b>You:</b> Oh yeah, I matched with her. She seems fun.
      <br /> <b>Simon:</b> She is… but she's also a little chaotic for me.
      <br /> <b>You:</b> Chaotic how?
      <br /> <b>Simon:</b> I probably shouldn't say too much. She's still my
      friend.
      <br /> <b>You:</b> You can tell me.
      <br /> <b>Simon:</b> Did she mention her last relationship?
      <br /> <b>You:</b> She said her ex suddenly blocked her.
      <br /> <b>Simon:</b> It wasn't exactly sudden.
      <br /> <b>You:</b> What do you mean?
      <br /> <b>Simon:</b> I heard he found some messages on her phone, and
      learned some things..
      <br /> <b>You:</b> Oh…
      <br /> <b>Simon:</b> I don't know the full story. But it sounded…
      complicated.
      <br /> <b>You:</b> I see.
      <br /> <b>Simon:</b> Anyway, I probably shouldn't speculate too much.
      <br /> <b>Simon:</b> Just thought you should know.
      <br /> <b>You:</b> Are you also going to the meeting today? Everyone I
      talked seemed to be getting ready.
      <br /> <b>Simon:</b> Yes! I was the one who sent out a Google Calendar
      invitation actually so they won't forget. Do you want to join?
      <br /> <b>You:</b> Maybe…?
      <br /> <b>Simon:</b> You can find it easily. You will know you're there
      when you see them.
      <br /> <b>You:</b> Who are you talking about?
      <br /> <b>Simon:</b> You know who. The people who are always there.
    </div>
  </div>
);

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null;

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {
  CIRCLEDANCE: (
    <div className="mb-4 mt-5 max-w-3xl space-y-4">
      <div className="mb-1 text-xl font-bold">Three Tinfoil</div>
      <b>Three:</b> So… I guess you finally found me.
      <br /> <b>You:</b> Who are you?
      <br /> <b>Three:</b> I'm one of the Tinfoil siblings. Obviously.
      <br /> <b>You:</b> Why couldn't I see you before?
      <br /> <b>Three:</b> I was watching you. Waiting for the right moment to
      show up.
      <br /> <b>You:</b> Why hide in the first place?
      <br /> <b>Three:</b> Because the others don't really like me.
      <br /> <b>You:</b> Why not?
      <br /> <b>Three:</b> Oh, who knows. Maybe they got upset when I changed
      their phone passwords while they weren't looking. Or when I hacked one of
      their emails and sent a few creative messages.
      <br /> <b>You:</b> That… sounds like it could annoy people.
      <br /> <b>Three:</b> Or maybe it was the fireworks incident.
      <br /> <b>You:</b> Fireworks?
      <br /> <b>Three:</b> Relax. They weren't real fireworks. Mostly.
      <br /> <b>You:</b> Those are some pretty intense pranks.
      <br /> <b>Three:</b> Ugh, whatever. They're all boring anyway.
      <br /> <b>You:</b> I don't think so. They all seemed interesting when I
      talked to them. Maybe you should try being friends with them again.
      <br /> <b>Three:</b> Seriously? With them?
      <br /> <b>You:</b> Why not?
      <br /> <b>Three:</b> Blue's hair is dry and annoying to look at. Linden's
      songs barely rhyme half the time. Grant's street photography is trash.
      Simon spends more time talking to spreadsheets than to actual humans. Who
      else? Oh.. Erika… honestly, who even cares what she's thinking half the
      time? She disappears mid-conversation.
      <br /> <b>You:</b> Wow… you really are a hater and a prankster.
      <br /> <b>Three:</b> Maybe I am, but what are they? Also, my birthday is
      early June if you care about that stuff.
      <br /> <b>You:</b> Good to know.
      <br /> <b>Three:</b> Also, I have something for you. I hope you will make
      the right decision. Who is your best match?
      <table className="border-collapse items-center border-2 border-black pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="border-2 border-black p-2">Name</th>
            <th className="border-2 border-black p-2">😡</th>
            <th className="border-2 border-black p-2">🙂</th>
            <th className="border-2 border-black p-2">☀️</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="whitespace-pre border-2 border-black p-2">Linden</td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2"></td>
          </tr>
          <tr>
            <td className="whitespace-pre border-2 border-black p-2">Erika</td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2"></td>
          </tr>
          <tr>
            <td className="whitespace-pre border-2 border-black p-2">Blue</td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2"></td>
          </tr>
          <tr>
            <td className="whitespace-pre border-2 border-black p-2">Grant</td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2"></td>
          </tr>
          <tr>
            <td className="whitespace-pre border-2 border-black p-2">Simon</td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2"></td>
          </tr>
          <tr>
            <td className="whitespace-pre border-2 border-black p-2">Three</td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2">
              _ _ _ _ _ _ _ _ _
            </td>
            <td className="whitespace-pre border-2 border-black p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
