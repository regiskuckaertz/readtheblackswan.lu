---
title: We need to talk about viewability
date: 2017-03-16 06:59:00 +00:00
---

Let us start with a short story.

## How a single pixel ruined months of efforts and made me question why I'm working my ass off

One day, we received an email from one of our users who complained that our website slowed his browser down. "Another crappy ad that slipped through the cracks," I thought. When things like that happen---which fortunately is not very often---it is always because an ad is doing some crazy stuff, like downloading huge images or running poorly written JavaScript. We follow a well-oiled process in these situations: chase down the faulty ad, identify its origin and seal the leak. This time was different though.

More emails started pouring in from in and out of the company, with reports of pages going blank, computer fans heating up and browsers becoming unresponsive. Soon enough, we were able to see  by ourselves the same thing happen. Something was hurting the website, and every second thousands of people were being affected; it was time to hit the panic button.

Did we unintentionally break something? By turning off ads, we noticed pages were running smoothly, with no noticeable effect. Although we tend to release several times a day, we were pretty sure nothing could have produced such a disproportionate effect. In the meantime, another feedback email came in. The email was unusually detailed, contained a recorded timeline along with a fairly accurate diagnostic of what was causing the issue: a viewability pixel.

Fucking viewability.

We quickly zoned in on a third-party service we use to, among other things, track viewability. Soon enough, we identified a  memory leak in their library. The fact that not only each ad comes with its own copy of the pixel, and also many ads themselves package a copy of their own, made things even worse. We quickly turned off our tracking pixel, conscious it would only serve to alleviate the problem; fortunately, that seemed to be enough to stop negative feedbacks.

I was boiling. While we were investigating the issue, it dawned on me how powerless The Guardian was to actually control the experience on its own territory. A colleague of mine articulated the problem no better than I could: 

> We routinely agonise over adding 10<abbr title="kilobytes">kb</abbr> of Javascript to our pages [...] This is why it's particularly frustrating that multiple adverts are able to increase the size of our pages by so much when we work so hard to avoid it. 

While he was referring to how advertisers are so opulent in their distribution of obese ads, the same argument could be used for the appalling lack of diligence put in delivering software that is supposed to run on somebody else's platform.

For the first time since I joined The Guardian, I doubted the value of the incredible, tireless work of our department to deliver great, sustainable journalism. Indeed, *what's the point of all this, if somebody at the other end of the World can tear all our work to shreds by the simple push of a button?* And get out with it without a single scratch? More sickening than anything else was the fact that for those who were affected, it was The Guardian's fault, and it only brought grist to the mill of those in favour of enabling their adblocker on our website.

This event was the last straw that broke the camel's back. I've been moaning to my colleagues about the state of the Advertising industry for a long time now. The conclusion we always come to is that we're not in a position to negotiate, that market pressure is just too strong and we need to comply with whatever [masquerade of regulation](https://www.iab.com) they come up with. But I find the exact opposite is true.

Advertising starts and ends on websites like ours. By definition, ads are third-class citizens; it is only through the deliberate action of a publisher that an ad fulfils its own purpose. Being in that position is extremely valuable, as it gives the publisher the best---no, the *only*---vantage point from which one can see things with everyone's best interest in mind: itself, the reader, and indeed the advertiser. I think it is important to outline here that a publisher's only goal has to be a combination where the three actors come out as winners. Why should be fairly obvious: all we need is to look at the current situation, where bloated ads, surveilling and tracking people wherever they go online generate ROIs that are getting thinner and thinner, and grow the pool of those who just can't stand it anymore and install an adblocker. This race to the bottom has to end; and as engineers, the responsibility lies on us to think about systemic elements, how they interact with each other and how to combine them effectively. It is after all [what we are trained to do](https://en.oxforddictionaries.com/definition/engineer).

So let's start with viewability.

## [Mr Beckett doesn't sell enough tomatoes]

Viewability tracking has all the traits of a dystopian future. Imagine a convenience store where every product on the shelf is equipped with proximity sensors and cameras. Brands behind those products will not pay stores for shell space, but instead for the number of times they detect *interest*; because paying for all those people that don't even see their products does not make any sense, does it? Some products also come with fingerprint readers, and sensors that record your breathing activity or the temperature of your skin, just in case you were a fake customer payed by the owners of the store to artificially boost interest metrics. In all fairness, this extreme paranoia did not come from nowhere. It's not like all convenience stores are models of virtue; some have indeed engaged in deception tactics in order to grow their revenue. But not all stores are evil though, and to prove it they've installed their own cameras and sensors, they can track interest just as well and have the numbers to back their claims. Alas, that's too late. The brands will only trust *their* numbers. As if it made any difference: customers are getting sick of these overweight products, carrying cans of tomato soup used to be easy, now it's like a CrossFit Open---they're all ignoring these products and go straight to the organic department.

Enough with analogies. By now you should see how ludicrous this situation is. I am no science-fiction writer, but I'd bet my left nut no author would ever come up with a scenario as lame and boring as that one. When you visit a website, you can be certain this is what happens though, more than 99% of the time.

Let's take a step back and look at what viewability is. Many advertisers today will only pay for a "viewable impression," i.e. one where the reader actually sees the ad. Yeah, [good luck with that](https://www.youtube.com/watch?v=Ahg6qcgoay4). If you don't see how laughable this idea is, consider for a moment that for the past two years, the whole industry has been unable to agree on a single definition. All of them are variations on the same concepts, and all rival in their absurdity. Here's [the IAB version](http://blogs.wsj.com/cmo/2015/07/27/with-online-ads-viewable-means-different-things-to-different-people/): "a display ad is viewable if 50% or more of its pixels appear on-screen for at least one continuous second." You really cannot make this shit up. GroupM's definition goes as far as *100% of the ad*. The sadists.

Wait, it gets worse. How viewability tracking is done technically has been devised with the same level of amateurism. These tracking libraries are so bloated, CPU- and network-hungry that they have a negative impact on viewability itself. Not only that, but as each intermediary in the ad delivery chain---publisher included---wants to know, it is not unusual to see ads come bundled with two, three or more viewability trackers. Factor out the weight of the ad itself and you're already flirting around the 100kb mark. And that's for one ad!

I call this the [observer effect](https://en.wikipedia.org/wiki/Observer_effect_(physics)) of Advertising. That's what happens when the focus is on measuring how "viewable" an ad is. When all you have is that one second, you will do everything to make sure it is not spoilt---and publishers will just play ball, because money. I wonder though, how would advertisers react if suddenly one started hiding ads as soon as that one second has passed? It would still count as viewable impressions, wouldn't it? Even though the chances that readers would even pay attention to them would be close to nil---even if they *wanted* to. Or think about this irony: no matter how smart viewability trackers are, they still have to compete with other resources in the browser, including the ad itself; and so, one second of one may not be the same as another's. Which one counts? Worse, a tracker may start counting before the ad is actually rendered... there is no way any of them is able to sort out these kind of discrepancies.

All these obstacles, and more, vanish once you turn viewability on its head.

## Redefining viewability

When an ad appears on screen, who's responsible?

Does an ad manifest itself, pop up into the page of its own volition? No. Does the reader ask that an ad appears on her screen? Nope. An ad fills a hole that was carved for it. Who is it that carved that hole? The publisher. Does it make any difference if it is one ad or another that fills that hole? None at all. Does it make any if, for the same ad, the position of the hole changes? It makes a hell of a difference.

You should see where I'm going. There is a fundamental misconception in the current definition of viewability: **it has nothing to do with the ad and everything to do with the ad slot**. If an ad enters the viewport, it is only by inference!

I guess this insight is not really life-changing, is it? <q>Well of course an ad appears at a specific location in the page, duh! You still want to know when it becomes visible though, otherwise how would you count viewable impression?</q> lol, we'll get back to that in a moment; let's think a bit more about that inversion of dependence and see what we can get out of it.

That hole carved in a page does not materialise out of thin air, does it? There's not a dice being rolled every time a reader visits a page to allocate a position to each ad slot. Just like in a printed publication, the layout of a page is carefully crafted, and so are its ad slots. **Each ad slot is there by design**. But that's not all. What is making a reader stay focused for some time on a page? We can discount the ads, almost by definition. It's the content of the page, right? Again, something entirely under the control of the publisher, and no one else.

Going from there, we can conclude that the viewability of an ad slot is not the result of chance (or lack thereof), but of intentional design choices. Similarly, a page with poor content is unlikely to provide a good ground for viewable ads; by crafting engaging stories, publishers also ease readers into a state where they could potentially open up to advertising.

This is the cornerstone of my argument, because as soon as you start thinking about viewability as a feature on the publisher's side, then several things fall into place. **By measuring viewability upstream, irrespective of what ad fills a slot, you can feed that information back into the ad auction process.** And by doing so:

2. It empowers publishers to sell ad slots based on their true value, e.g. by increasing the floor price for highly-viewable slots and lowering it otherwise
3. It creates true competition between publishers not only on price but also on guaranteed results
2. It empowers advertisers to make better informed decisions in terms of budget allocations
2. Finally, it enables every intermediary to stop bundling the ad with their own viewability tracker bundled, with the double-effect of reducing the weight of the ad running in the browser *and* by extension of improving the viewability of the ad itself!

On that last point, some may think I'm delusional. Indeed, how can then an advertiser make sure the publisher is not lying about its viewability metrics and stealing money from him? That is indeed one of the reasons why they engage in such counter-productive tactics. It is worth pondering about this question for a moment, before we move on. The act of telling the truth in an auction is something that has been studied left and right in economics and game theory, but only on the bidder side.

[Because there is an incentive for the publisher to [tell the truth](https://en.wikipedia.org/wiki/Incentive_compatibility); first, raising the floor price increases the chance of getting no bid, and second, the risk of losing credibility if caught can have a highly negative impact in the long-term. Second, floor price optimisation is a hard thing...]

[## That 50% crap needs to go away]

Viewability is a spectrum

In a user session, an ad slot may go from 0% visible to 100% to 50% to 60% to 10%, etc. It does not make sense to take only one single measurement here, all are part of the viewability of the ad slot.

an ad slot has a "viewability profile" that is the resulting of aggregating all these numbers

we can map that profile to a "viewability grade", which is the data that is then fed into the bidding process.