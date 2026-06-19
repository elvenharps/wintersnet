import type { Metadata } from "next";
import Link from "next/link";
import { ForestSilhouette } from "@/components/forest-silhouette";
import { DeadHost } from "@/components/dead-host";

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
    <article>
      <aside className="border-b border-[var(--accent)]/30 bg-[var(--surface-muted)]">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-on-accent text-xs font-bold"
            >
              ✦
            </span>
            <p className="leading-relaxed text-[var(--foreground)]">
              <strong className="font-semibold">New &mdash; Redmond Chat:</strong>{" "}
              the spiritual successor to MSN Chat. Modern, browser-native, no
              plugins. Secure IRC over SSL. Open to everyone.
            </p>
          </div>
          <a
            href="https://flutterby.chat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
          >
            Join Redmond Chat <span aria-hidden>→</span>
          </a>
        </div>
      </aside>

      <header className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[140px] opacity-80" />
          <div className="mist" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-28 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            Long-form · Archival
          </p>
          <h1 className="serif mt-4 text-4xl sm:text-5xl font-medium tracking-tight">
            History of MSN Chat
          </h1>
          <p className="mt-4 text-[var(--muted)] italic">
            A reference point for the years to come.
          </p>
        </div>
      </header>

      <div className="prose-article mx-auto px-6 py-14">
        <p className="lead">
          <strong>Note about the author:</strong>{" "}
          At the (very) young age of 11,
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

        <nav aria-label="Table of contents" className="toc">
          <p className="toc-label">Contents</p>
          <ol>
            <li><a href="#comic-chat">An introduction and mention of Comic Chat</a></li>
            <li><a href="#beginning">The beginning of MSN Chat</a></li>
            <li><a href="#merger">The first great merger: Comic Chat and MSN Chat</a></li>
            <li><a href="#web-chat">The era of Web Chat</a></li>
            <li><a href="#gatekeeper">GateKeeper and GateKeeperPassport</a></li>
            <li><a href="#categories">Categories and the chat room landscape</a></li>
            <li><a href="#staffing">Behind the Scenes &mdash; MSN Chat staffing</a></li>
            <li><a href="#admin-tools">MSN Chat &mdash; Admin Tools</a></li>
            <li><a href="#architecture">Chat Architecture</a></li>
            <li><a href="#9msn">9MSN Chat</a></li>
            <li><a href="#end">The end of MSN Chat</a></li>
            <li><a href="#further-reading">Further reading &mdash; the IRCx Reference</a></li>
            <li><a href="#credits">Credits</a></li>
          </ol>
        </nav>

        <h2 id="comic-chat">An introduction and mention of Comic Chat</h2>
        <p>
          While it would be inaccurate to stipulate that the origins of MSN Chat
          are directly correlated with Comic Chat, their respective histories
          are certainly closely intertwined. Comic Chat, and indeed its server
          of <DeadHost since="1996">mic.msn.com</DeadHost>, came to be with the release of Windows 95 and Internet
          Explorer 3.0 in 1996. While the server was indeed a true IRC server,
          if one was to connect using an alternate client (for example, Pirch)
          it would be somewhat irritating, as Comic Chat users would send text
          with a special prefix not interpreted by any other clients. The Comic
          Chat server remained separate until Microsoft decided to shut down
          its development servers for Exchange Chat, and merge the users of the
          Comic Chat server into <DeadHost since="1999">irc.msn.com</DeadHost>.
        </p>
        <p>
          Comic Chat itself was a Microsoft Research project, conceived and
          built by <strong>David Kurlander</strong>{" "}as part of MSR&rsquo;s
          Virtual Worlds Group and later carried into Microsoft&rsquo;s
          Internet Division. The technology &mdash; automatic comic-panel
          layout driven by user chat &mdash; was first presented at SIGGRAPH
          &rsquo;96 and shipped with Internet Explorer 3.0 on 13 August 1996.
          Its signature visual identity, the cast of avatars and the painted
          backgrounds, was the work of the underground comic artist{" "}
          <strong>Jim Woodring</strong>. The client was eventually bundled
          with IE3, IE4 and IE5, Windows 98 and Windows 2000, and was
          localised into 24 languages before Microsoft retired it with the
          final 2.5 release in March 1999.
        </p>

        <h2 id="beginning">The beginning of MSN Chat</h2>
        <p>
          In order to truly understand how MSN Chat came to be, one has to look
          as far back as 1994. A Microsoft-sponsored project was launched,
          referred to as <DeadHost since="1995">chatbeta.exchange.microsoft.com</DeadHost>. This was the very
          first IRCx server which users were able to connect to, and was the
          development server for the Exchange Chat functionality. While this
          was not technically a public Chat Server, the administrators and
          developers had no issues with people connecting; presumably as this
          aided their development and allowed for feedback. Shortly after this,
          MSN.com was launched by Microsoft. One of the first services that
          MSN.com offered was IRC: initially this was done via the use of two
          different environments, listed below (keep in mind that the users of
          <DeadHost since="1996">chat.msn.com</DeadHost> were primarily the comic chat users, as this was the
          default connection address of such):
        </p>
        <ul>
          <li>
            <DeadHost since="1997">publicchat.msn.com</DeadHost> &mdash; This setup was open for
            all, regardless of ISP.
          </li>
          <li>
            <DeadHost since="1996">chat.msn.com</DeadHost> &mdash; This was the old server that
            the Comic Chat Client used.
          </li>
        </ul>
        <p>
          How long the aforementioned setup was maintained for has been lost to
          history, however eventually the two merged and became <DeadHost since="1999">irc.msn.com</DeadHost>,
          allowing connections on the de-facto IRC port of 6667. <DeadHost since="1999">irc.msn.com</DeadHost>
          ran separately to <DeadHost since="1995">chatbeta</DeadHost>, however they both used the same software
          and supported mostly the same functionality. The commonly used
          clients for these two environments were mIRC, the discontinued Comic
          Chat client and Pirch, the latter gaining a large fanbase and
          popularity on both. <DeadHost since="1999">irc.msn.com</DeadHost> grew rapidly, and soon was home to
          thousands of users who had migrated from other networks, enjoying the
          new functionality introduced by the IRCx draft which Microsoft had
          incorporated into their software.
        </p>

        <h2 id="merger">The first great merger: Comic Chat and MSN Chat</h2>
        <p>
          Microsoft soon began to realize that running and maintaining three
          separate environments was somewhat fruitless, and required too much
          maintenance and support; the <DeadHost since="1995">chatbeta</DeadHost> servers were to be switched
          offline, and the users and (some) staff transitioned over to
          <DeadHost since="1999">irc.msn.com</DeadHost>. Towards the end of 1995, <DeadHost since="1995">chatbeta</DeadHost> had been fully shut
          down, with the comic chat exclusive servers soon to follow. By 1997,
          all remaining servers were linked together as <DeadHost since="1999">irc.msn.com</DeadHost>. At this
          stage there were potentially 9 different servers available for users
          to connect to. By 1998/1999, the number of active servers had
          decreased to 7, and the development team behind MSN Chat were
          contemplating what they considered to be its marketable future. A
          deserving mention at this point is how Koach came to be a part of
          what became MSN Chat &mdash; as the server which the Comic Chat
          client used to connect to (<DeadHost since="1996">MIC/chat.msn.com</DeadHost>, a contraction
          of <em>Microsoft Internet Chat</em>) was shut down shortly
          after the demise of the <DeadHost since="1995">chatbeta</DeadHost> server, the users and staff
          transitioned over to <DeadHost since="1999">irc.msn.com</DeadHost> too. Koach was hired as a trainer at
          this point, in order to educate the users and staff on IRC clients
          and a whole different world than what they were used to with Comic
          Chat.
        </p>

        <h2 id="web-chat">The era of Web Chat</h2>
        <p>
          In late 1999, what the MSN Chat Development Team had been working on
          for a while was announced to the public; <DeadHost since="1999">irc.msn.com</DeadHost> was to be
          closed, and the all new <DeadHost since="2006">chat.msn.com</DeadHost> was to be opened. The
          differences were significant, both behind the scenes and at front of
          house. It was a move by MSN to try to open up IRC to more than the
          current client-based audience, by allowing people to chat directly
          from their browser with little to no technical knowledge. At first,
          third party clients such as mIRC and Pirch were still able to connect
          to <DeadHost since="2006">chat.msn.com</DeadHost>; looking back, this was probably to allow people to
          transition across correctly, because very shortly afterwards the
          &ldquo;GateKeeper&rdquo; and &ldquo;GateKeeperPassport&rdquo; method
          of authentication was introduced and connections to <DeadHost since="2006">chat.msn.com</DeadHost> via
          third party clients were prohibited (though not fully restricted).
          What became known as Web Chat (OCX, Chat Control) had actually
          stemmed from the <DeadHost since="1999">irc.msn.com</DeadHost> days; the MSN Chat Development Team had
          been working on a web-based control for the MSN Live Events /
          Celebrity Chats team (Chat Control Versions 1 &ndash; 2), and this
          directly connected to the existing IRC server, with no authentication
          challenges.
        </p>
        <p>
          The Chat Control itself was distributed as an ActiveX COM object,
          which is what locked the official user experience to Internet
          Explorer (and, more loosely, to Netscape Navigator 4.x and the
          MSNTV/WebTV set-top boxes). In 2001 Microsoft went a step further
          and closed off third-party IRC clients entirely, leaving the
          browser-based Chat Control as the only officially sanctioned way
          in. One architectural consequence worth flagging: each Chat Control
          instance scoped its TCP session to a single room &mdash; switching
          rooms in the UI quietly tore down and re-established the underlying
          connection. That one-room-per-connection model was a real
          departure from RFC 1459 IRC and quietly shaped many of MSN
          Chat&rsquo;s protocol-level peculiarities (see the{" "}
          <a
            href="https://flutterby.chat/ircx/msn-flavor#the-one-room-per-connection-model"
            target="_blank"
            rel="noreferrer"
          >
            IRCx Reference
          </a>{" "}
          for the technical consequences).
        </p>
        <p>
          The community didn&rsquo;t take that quietly. Robert Lancaster
          (xsu|c|desn0wmanx) reverse-engineered the GateKeeper challenge and
          published code that allowed third-party clients to authenticate
          against MSN&rsquo;s servers, breathing years of additional life
          into the mIRC and Pirch ecosystem and quietly spawning a small
          economy of unofficial clients and connector libraries.
        </p>

        <h2 id="gatekeeper">GateKeeper and GateKeeperPassport</h2>
        <p>
          Authentication in MSN Chat&rsquo;s Web Chat era was layered on top
          of the IRCx <code>AUTH</code> command (itself a wrapper around{" "}
          SASL, the Simple Authentication and Security Layer, as specified
          across the Pfenning IRCx Internet Drafts &mdash; <code>00</code>,{" "}
          <code>01</code>, <code>02</code>, and <code>04</code> &mdash;
          publicly archived in the IETF datatracker). Microsoft registered
          two SASL mechanisms with their own servers, advertised on the
          wire as <code>GateKeeper</code> and <code>GateKeeperPassport</code>,
          and shipped both as Security Support Providers under SSPI &mdash;
          the same framework NT used for Kerberos and NTLM. The two
          mechanisms looked very similar on the wire and almost identical at
          the protocol layer, but they corresponded to two very different
          kinds of user.
        </p>
        <p>
          <strong>GateKeeper</strong>{" "}
          was the guest path. A client could
          connect, run the SASL handshake without supplying any Passport
          credentials, and end up in MSN Chat under an auto-assigned
          nickname of the form <code>Guest_</code> followed by a numeric
          suffix. The server kept this lane open by issuing a random
          session key during the handshake, which the Chat Control combined
          with embedded keying material in <code>msnchat.ocx</code> to
          produce its response. Guests were intentionally second-class
          citizens: nicknames were ephemeral (a new <code>Guest_#####</code>
          on every login), profiles did not persist, and a guest could not
          create or own a channel, hold the Host key, or transfer ownership.
          For most spammers and casual visitors this was the path of least
          resistance, which is also why most of MSN Chat&rsquo;s abuse
          mitigation work was aimed at it.
        </p>
        <p>
          <strong>GateKeeperPassport</strong>{" "}
          was the registered path. The
          same SASL handshake ran, but the client first obtained a ticket
          from the .NET Passport network (the precursor to today&rsquo;s
          Microsoft account) and bound that ticket into the authentication
          exchange. The chat server validated the ticket against Passport
          out of band; on success the user joined under their chosen
          persistent nickname rather than a <code>Guest_</code> handle, and
          unlocked the rest of the service &mdash; creating and owning
          channels, holding Host/Owner keys, persistent profiles, and the
          full range of moderated and members-only rooms.
        </p>
        <p>
          The interesting design choice was that the proprietary part &mdash;
          the actual algorithm the Chat Control used to answer GateKeeper&rsquo;s
          random session key &mdash; lived almost entirely inside{" "}
          <code>msnchat.ocx</code>. That made GateKeeper resistant for a
          while, but, once the OCX was distributed to every browser that
          loaded chat.msn.com, the keying material and the response routine
          were effectively in everyone&rsquo;s hands. From there it was a
          matter of static analysis &mdash; which is exactly the route
          Lancaster and others took. GateKeeperPassport was harder to abuse
          in the same way: forging the Passport ticket itself was a much
          larger problem than reproducing a single client-side response, so
          third-party clients overwhelmingly stuck to the guest lane.
        </p>
        <p>
          For the protocol-level mechanics &mdash; the <code>AUTH</code>{" "}
          command&rsquo;s <code>I</code>/<code>S</code>/<code>*</code>{" "}
          sequence codes, the byte-level layout of the GateKeeper challenge
          frame, the numerics the server returns at each stage, and the
          ANON path that lets a client skip auth entirely &mdash; see the
          dedicated{" "}
          <a
            href="https://flutterby.chat/ircx/auth"
            target="_blank"
            rel="noreferrer"
          >
            IRCx Auth reference
          </a>{" "}
          at flutterby.chat.
        </p>

        <h2 id="categories">Categories and the chat room landscape</h2>
        <p>
          The defining UX touch of MSN Chat was its categorisation. Rather
          than presenting a flat list of thousands of rooms, the directory
          carved them up into broad categories &mdash; Romance, Religion,
          Lifestyles, age-based groupings (Teen, 20-something, 30-something,
          40+), regional, music, entertainment, computing, and so on. Each
          category housed dozens or hundreds of rooms, most of them
          user-created, and many became durable communities in their own
          right. For a great many former chatters, the categorisation is the
          thing they remember most clearly about the experience &mdash;
          stumbling across the same room every evening, the same regulars,
          the same arguments.
        </p>

        <h2 id="staffing">Behind the Scenes &mdash; MSN Chat staffing</h2>
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

        <h2 id="admin-tools">MSN Chat &mdash; Admin Tools</h2>
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

        <h2 id="architecture">Chat Architecture</h2>
        <p>
          MSN Chat&rsquo;s backend was structured around at least two
          distinct service tiers, with a clean division of responsibility
          between them.
        </p>
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
        <p>
          Several MSN Chat behaviours follow naturally from this room-as-a-
          server-side-locality constraint. The one-room-per-connection model
          (see the Web Chat section above) made architectural sense, because
          a connection that was &ldquo;in a room&rdquo; was by definition
          pinned to a particular Chat Server &mdash; switching rooms meant
          potentially switching server, which was cleaner as a fresh socket
          than as an in-band hand-off. The <code>CLONEABLE</code> mode,
          which spawned overflow rooms like <code>%#TheLobby2</code> and{" "}
          <code>%#TheLobby3</code> when a popular room filled, was in
          practice a horizontal-scale primitive: it let the network split a
          popular room&rsquo;s load across additional Chat Server capacity
          without anyone in the original room seeing a disruption. And the
          classic IRC problem of synchronising channel state across a mesh
          of peer servers (netsplits, mode collisions, timestamp tie-breaks)
          simply did not apply &mdash; no room ever spanned more than one
          Chat Server, so the Directory tier handled &ldquo;where to send
          this client&rdquo; and the Chat tier handled &ldquo;what&rsquo;s
          happening inside one room,&rdquo; and neither layer needed to
          gossip with peers about live room state.
        </p>
        <p>
          For the protocol-level treatment &mdash; how this topology shows
          up in <code>JOIN</code>, <code>CLONE</code>/<code>CLONEABLE</code>,
          the per-room ownership model, and the channel-mode surface &mdash;
          see{" "}
          <a
            href="https://flutterby.chat/ircx/msn-flavor#backend-topology"
            target="_blank"
            rel="noreferrer"
          >
            Backend topology
          </a>{" "}
          in the IRCx Reference at flutterby.chat.
        </p>

        <h2 id="9msn">9MSN Chat</h2>
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

        <h2 id="end">The end of MSN Chat</h2>
        <p>
          On 14 October 2003, citing concerns about online child safety and
          the difficulty of moderating user-created rooms at scale, Microsoft
          closed MSN Chat across roughly 28 countries &mdash; effectively
          ending the free service everywhere except the United States,
          Canada, Japan and Brazil. In those four markets, the service
          continued, but only as a subscription tied to a Microsoft Passport
          account, priced at around twenty dollars a year. The decision was
          announced as a child-protection measure following high-profile UK
          news coverage that year, though spam, abuse, and the operational
          cost of moderating an open service almost certainly played a role.
        </p>
        <p>
          The subscription model never thrived. On 31 August 2006 Microsoft
          announced that the remaining MSN Chat service would close, and on
          16 October 2006, at approximately 11:30 AM EST, the{" "}
          <DeadHost since="2006">chat.msn.com</DeadHost> servers were powered down
          for the last time. After more than a decade &mdash; counting the
          chatbeta era &mdash; IRCx at Microsoft, and MSN Chat with it, came
          to a quiet end. Many of the communities scattered to other
          networks: some to{" "}
          <a href="irc://irc.koach.com:6667">irc.koach.com</a>, some to the
          big public IRC networks, and others simply faded. The IRCx
          Internet Drafts themselves &mdash; Pfenning <code>00</code>,{" "}
          <code>01</code>, <code>02</code>, and <code>04</code> &mdash;
          never advanced through the IETF process, but remain publicly
          archived at the IETF datatracker for anyone wanting to read the
          source material directly.
        </p>

        <h2 id="further-reading">Further reading &mdash; the IRCx Reference</h2>
        <p>
          This article is the human-narrative companion to a separate,
          deeper resource that documents the IRCx protocol itself at the
          wire level: the{" "}
          <a
            href="https://flutterby.chat/ircx"
            target="_blank"
            rel="noreferrer"
          >
            IRCx Reference at flutterby.chat
          </a>
          . Where this page tells the story of MSN Chat, the Reference
          unpacks the protocol &mdash; the verbs, the numerics, the modes,
          the auth handshake, and the MSN-specific extensions. Together
          they form a fairly complete public record. The Reference&rsquo;s
          seven sections are:
        </p>
        <ul>
          <li>
            <a
              href="https://flutterby.chat/ircx/overview"
              target="_blank"
              rel="noreferrer"
            >
              Overview
            </a>{" "}
            &mdash; what IRCx tried to standardise, and which of those
            ideas quietly leaked back into modern IRC.
          </li>
          <li>
            <a
              href="https://flutterby.chat/ircx/protocol"
              target="_blank"
              rel="noreferrer"
            >
              Protocol
            </a>{" "}
            &mdash; the wire format, the five connection phases, and the
            complete numeric catalogue.
          </li>
          <li>
            <a
              href="https://flutterby.chat/ircx/auth"
              target="_blank"
              rel="noreferrer"
            >
              Auth
            </a>{" "}
            &mdash; the <code>AUTH</code> command, the SSPI/SASL package
            model, GateKeeper and GateKeeperPassport, and the byte-level
            GKSSP frame format.
          </li>
          <li>
            <a
              href="https://flutterby.chat/ircx/channels"
              target="_blank"
              rel="noreferrer"
            >
              Channels
            </a>{" "}
            &mdash; the three-tier access model, every channel mode, every
            channel property, and the <code>ACCESS</code> verb.
          </li>
          <li>
            <a
              href="https://flutterby.chat/ircx/msn-flavor"
              target="_blank"
              rel="noreferrer"
            >
              MSN flavour
            </a>{" "}
            &mdash; everything period MSN Chat did differently from the
            draft, including the backend topology described above.
          </li>
          <li>
            <a
              href="https://flutterby.chat/ircx/reading-the-drafts"
              target="_blank"
              rel="noreferrer"
            >
              Reading the drafts
            </a>{" "}
            &mdash; a critical reading of the Pfenning drafts: where the
            spec is ambiguous, what time has vindicated, and what should
            quietly stay buried.
          </li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          <em>
            This page was sharpened in May 2026 with cross-references to
            the IRCx Reference. The narrative content predates that update
            by many years; only inline links and the Architecture section
            expansion are new.
          </em>
        </p>

        <h2 id="credits">Credits</h2>
        <p>
          <strong>Koach (real name withheld):</strong> Having been with MSN
          Chat from the very start, Koach was integral to the accuracy of this
          article. He runs his own IRC network now, and can be contacted there:{" "}
          <a href="irc://irc.koach.com:6667">irc.koach.com</a>.
        </p>
        <p>
          <strong>Robert Lancaster:</strong>{" "}Known on MSN chat by his alias
          xsu|c|desn0wmanx, he was one of the very first to work out how to
          bypass the GateKeeper authentication challenge introduced in Web
          Chat &mdash; his published work effectively kept third-party clients
          like mIRC and Pirch alive against MSN Chat for years.
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
          pertaining to MSN Chat.
        </p>

        <div className="mt-16 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--muted)]">
          <Link href="/">← Back to WintersNet</Link>
        </div>
      </div>
    </article>
  );
}
