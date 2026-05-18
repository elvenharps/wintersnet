import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "History of MSN Chat",
  description:
    "A detailed, fact-checked history of MSN Chat — from its Comic Chat origins through its final years.",
  alternates: {
    canonical: "/history",
  },
  openGraph: {
    title: "History of MSN Chat",
    description:
      "A detailed, fact-checked history of MSN Chat — from its Comic Chat origins through its final years.",
    type: "article",
  },
};

export default function HistoryPage() {
  return (
    <article className="mx-auto px-6 py-16 sm:py-20">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--muted)]">
          Long-form
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
          History of MSN Chat
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          A reference point for the years to come.
        </p>
      </header>

      <div className="prose-article mx-auto mt-12">
        <p className="lead">
          <strong>Note about the author:</strong> At the (very) young age of 11,
          I stumbled upon the concept of IRC, quite entirely by mistake. I was
          an active participant on MSN Chat during the years of &rsquo;00 &ndash;
          &rsquo;06, and I don&rsquo;t at all claim to know the entire story
          &mdash; which is why a good portion of this has been contributed by
          the individuals I&rsquo;ve named in the credits. I am now a full time
          employee for Microsoft, working as a Service Engineer for Exchange
          Online and fully embedded within the Exchange Product Group &mdash;
          seems fitting that I appear to have come full circle. If you notice
          anything missing, or anything which is glaringly inaccurate, please
          feel free to contact me:{" "}
          <a href="mailto:nascott@microsoft.com">nascott@microsoft.com</a>.
        </p>

        <p>
          I&rsquo;ve been meaning to write something like this for very many
          years now; indeed, I may have pestered one or two people more than
          once, subsequently forgetting to take notes and having to ask (yet)
          another time in order to remind myself. This is dedicated to any and
          all folks who visited MSN during its active years, and I hope it
          serves as a reference point for the years to come.
        </p>

        <h2>An introduction and mention of Comic Chat</h2>
        <p>
          While it would be inaccurate to stipulate that the origins of MSN Chat
          are directly correlated with Comic Chat, their respective histories
          are certainly closely intertwined. Comic Chat, and indeed its server
          of mic.msn.com, came to be with the release of Windows 95 and Internet
          Explorer 3.0 in 1996. While the server was indeed a true IRC server,
          if one was to connect using an alternate client (for example, Pirch)
          it would be somewhat irritating, as Comic Chat users would send text
          with a special prefix not interpreted by any other clients. The Comic
          Chat server remained separate until Microsoft decided to shut down
          its development servers for Exchange Chat, and merge the users of the
          Comic Chat server into irc.msn.com.
        </p>

        <h2>The beginning of MSN Chat</h2>
        <p>
          In order to truly understand how MSN Chat came to be, one has to look
          as far back as 1994. A Microsoft-sponsored project was launched,
          referred to as chatbeta.exchange.microsoft.com. This was the very
          first IRCx server which users were able to connect to, and was the
          development server for the Exchange Chat functionality. While this
          was not technically a public Chat Server, the administrators and
          developers had no issues with people connecting; presumably as this
          aided their development and allowed for feedback. Shortly after this,
          MSN.com was launched by Microsoft. One of the first services that
          MSN.com offered was IRC: initially this was done via the use of two
          different environments, listed below (keep in mind that the users of
          chat.msn.com were primarily the comic chat users, as this was the
          default connection address of such):
        </p>
        <ul>
          <li>
            <strong>publicchat.msn.com</strong> &mdash; This setup was open for
            all, regardless of ISP.
          </li>
          <li>
            <strong>chat.msn.com</strong> &mdash; This was the old server that
            the Comic Chat Client used.
          </li>
        </ul>
        <p>
          How long the aforementioned setup was maintained for has been lost to
          history, however eventually the two merged and became irc.msn.com,
          allowing connections on the de-facto IRC port of 6667. irc.msn.com
          ran separately to chatbeta, however they both used the same software
          and supported mostly the same functionality. The commonly used
          clients for these two environments were mIRC, the discontinued Comic
          Chat client and Pirch, the latter gaining a large fanbase and
          popularity on both. irc.msn.com grew rapidly, and soon was home to
          thousands of users who had migrated from other networks, enjoying the
          new functionality introduced by the IRCx draft which Microsoft had
          incorporated into their software.
        </p>

        <h2>The first great merger: Comic Chat and MSN Chat</h2>
        <p>
          Microsoft soon began to realize that running and maintaining three
          separate environments was somewhat fruitless, and required too much
          maintenance and support; the chatbeta servers were to be switched
          offline, and the users and (some) staff transitioned over to
          irc.msn.com. Towards the end of 1995, chatbeta had been fully shut
          down, with the comic chat exclusive servers soon to follow. By 1997,
          all remaining servers were linked together as irc.msn.com. At this
          stage there were potentially 9 different servers available for users
          to connect to. By 1998/1999, the number of active servers had
          decreased to 7, and the development team behind MSN Chat were
          contemplating what they considered to be its marketable future. A
          deserving mention at this point is how Koach came to be a part of
          what became MSN Chat &mdash; as the server which the Comic Chat
          client used to connect to (MIC/chat.msn.com) was shut down shortly
          after the demise of the chatbeta server, the users and staff
          transitioned over to irc.msn.com too. Koach was hired as a trainer at
          this point, in order to educate the users and staff on IRC clients
          and a whole different world than what they were used to with Comic
          Chat.
        </p>

        <h2>The era of Web Chat</h2>
        <p>
          In late 1999, what the MSN Chat Development Team had been working on
          for a while was announced to the public; irc.msn.com was to be
          closed, and the all new chat.msn.com was to be opened. The
          differences were significant, both behind the scenes and at front of
          house. It was a move by MSN to try to open up IRC to more than the
          current client-based audience, by allowing people to chat directly
          from their browser with little to no technical knowledge. At first,
          third party clients such as mIRC and Pirch were still able to connect
          to chat.msn.com; looking back, this was probably to allow people to
          transition across correctly, because very shortly afterwards the
          &ldquo;GateKeeper&rdquo; and &ldquo;GateKeeperPassport&rdquo; method
          of authentication was introduced and connections to chat.msn.com via
          third party clients were prohibited (though not fully restricted).
          What became known as Web Chat (OCX, Chat Control) had actually
          stemmed from the irc.msn.com days; the MSN Chat Development Team had
          been working on a web-based control for the MSN Live Events /
          Celebrity Chats team (Chat Control Versions 1 &ndash; 2), and this
          directly connected to the existing IRC server, with no authentication
          challenges.
        </p>

        <h2>Behind the Scenes &mdash; MSN Chat staffing</h2>
        <p>
          Almost as soon as the transition was made to the Web Chat
          environment, and associated new servers, MSN began to start the
          process of outsourcing the day-to-day management tasks. One of the
          key factors involved was to ensure that the HelpDesk was staffed 24/7
          by properly trained individuals, working on a shift basis. A company
          called PSI won the bid for the US portion of MSN Chat, whereas
          various other companies won for the International portions &mdash;
          which were lost entirely circa 2004. For the purposes of this
          article, I will only be discussing the US portion of MSN Chat.
        </p>
        <p>
          Once PSI took over, some crucial staffing decisions had to be made. A
          significant number of previous volunteers were let go, however key
          people remained. Koach was hired to remain on as a liaison and
          trainer, and all of the Assistant Chat Managers (that originated back
          from Comic Chat) were initially kept on to manage the Host Teams in
          their respective categories. One of the more obvious changes in
          relation to staff that came about when PSI took over was the creation
          of previously unseen Guides. These people would work in shifts, in a
          call centre in the USA, and ensure that the HelpDesk channel was
          covered 24 hours a day, 7 days a week. At the time, the general
          perception was that Guides and Sysops were entirely separate, however
          in reality the vast majority of Guides were also Sysops &mdash; they
          simply used their Guide names whilst on duty in the HelpDesk. As time
          went on, and less and less users were connecting to MSN, Microsoft
          instructed PSI to make some staffing cuts to reduce their perceived
          cost. As such, all Assistant Chat Managers bar one were removed, thus
          combining all the volunteer hosts together under one umbrella, and
          all reporting to one Chat Manager. This person was then responsible
          for the running of the Official Channels across the entire US
          market, and so it remained until closure.
        </p>

        <h2>MSN Chat &mdash; Admin Tools</h2>
        <p>
          There were multiple admin tools developed over the years, and this
          article is only going to cover one of them, developed by Microsoft
          internally at Redmond for perceived global use. In reality, PSI
          (specifically, Koach) created tools which were easier for them to use
          than the ones provided by Microsoft &mdash; you can see his own
          created tools at this following url:{" "}
          <a
            href="http://koach.com/msntools/"
            target="_blank"
            rel="noreferrer"
          >
            http://koach.com/msntools/
          </a>
          .
        </p>
        <p>
          <strong>Daneel</strong> &mdash; A web based interface, primarily
          developed by and for the international market but also
          interchangeably used with the US market. Functionality included
          banning users, closing chat rooms which violated the Terms of
          Service, sending out broadcast (server or network wide) messages,
          monitoring users and &ldquo;spam&rdquo; &mdash; sending out messages
          of advertisement to sponsored rooms on a schedule.
        </p>
        <p>
          For a long time, there was the ability for users of third party
          clients to ban MSN Sysops from entering a channel. Daneel also had
          functionality to remove the Host / Owner keys and remove all
          privileges from the users therein to allow the Sysop to enter without
          hindrance.
        </p>

        <h2>Chat Architecture</h2>
        <p>
          <strong>Directory Server</strong> &mdash; known colloquially to users
          as the FINDS server, the Directory Server provided functionality that
          allowed clients to look up the location of a chat room or user and
          redirect the client to the correct Chat Server. This server was also
          responsible for generating the room list functionality within the
          main website.
        </p>
        <p>
          <strong>Chat Server</strong> &mdash; provided the chat rooms
          themselves. Core difference from regular IRC networks being that all
          chatters within an individual room were connected to the same Chat
          Server. Chatters could not join the room from a different server,
          with slight exceptions being allowed for Event rooms.
        </p>

        <h2>9MSN Chat</h2>
        <p>
          Whilst 9MSN, in the same way as the International Chats, used the
          same chat servers as the US Market, it was run entirely separately
          from them both. 9MSN Chat was never outsourced, and was ran by 9MSN
          until its closure.
        </p>
        <p>
          The Guides and Sysops of 9MSN all worked from home, however they were
          employed, and paid a small retainer, by 9MSN for their work. Each
          Guide or Sysop had their own section to manage, much in the same way
          that Assistant Chat Managers had their own section to manage. They
          would be responsible for hiring, firing and maintaining the host team
          for their individual sections, as well as taking shifts in the
          HelpDesk while on duty.
        </p>
        <p>
          The tools which Koach developed for the US staff to use were not used
          on 9MSN; the staff there used the Chat Admin Client to authenticate
          and work. While on duty, a Guide or Sysop would join the staff room
          (which was called GroundControl) as well as the host room for their
          section. What was also different is that each on duty staff member
          also joined the official channels.
        </p>

        <h2>Credits</h2>
        <p>
          <strong>Koach (real name withheld):</strong> Having been with MSN
          Chat from the very start, Koach was integral to the accuracy of this
          article. He runs his own IRC network now, and can be contacted there:{" "}
          <a href="irc://irc.koach.com:6667">irc.koach.com</a>.
        </p>
        <p>
          <strong>Robert Lancaster:</strong> Known on MSN chat by his alias
          xsu|c|desn0wmanx, he was one of the very first to work out how to
          bypass the Gatekeeper Authentication challenge introduced in Web
          Chat.
        </p>
        <p>
          <strong>Andrew Gee:</strong> Going by the alias of Bench, his
          programming knowledge in the later years of MSN Chat provided
          invaluable insight. We have worked together on many projects, and I
          consider him a close friend.
        </p>
        <p>
          <strong>Nathan Scott:</strong> Not much to say about me, really. I
          was active on MSN Chat between 2000 and 2006, and learned a great
          deal during that time. Now working for Microsoft, I was able to
          fact-check this article and make some needed adjustments. It can now
          be safely declared that this article is as accurate as possible
          pertaining to MSN Chat. I can be contacted on a private server
          created with Discord{" "}
          <a
            href="https://discord.gg/WyxjwgDyws"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>

        <div className="mt-16 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--muted)]">
          <Link href="/">← Back to WintersNet</Link>
        </div>
      </div>
    </article>
  );
}
