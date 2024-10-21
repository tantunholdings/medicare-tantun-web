"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ArrowUp } from "lucide-react";
import Disclaimer from "./Disclaimer";
import Navbar from "./Navbar";

const TermsOfUse = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const sections = [
    {
      title: "1. Service Overview",
      content:
        "      <p>Tantun provides a service where consumers and businesses can research and shop for various insurance and related products. Tantun is not an insurance company. It introduces users to insurance and related products offered by third parties. DO NOT CANCEL ANY EXISTING INSURANCE UNTIL YOU RECEIVE WRITTEN CONFIRMATION FROM THE INSURANCE COMPANY TO WHICH YOU ARE APPLYING THAT YOUR NEW POLICY IS IN EFFECT.</p>            ",
    },
    {
      title: "2. Eligibility",
      content:
        "      <p>You must be at least 18 years of age to use the Service. By agreeing to these Terms, you represent and warrant to us that: (a) you are at least 18 years of age; (b) you have not previously been suspended or removed from the Service; and (c) your registration and your use of the Service is in compliance with all applicable laws and regulations. If you are using the Service on behalf of an entity, organization, or company, you represent and warrant that you have the authority to bind that organization to these Terms and you agree to be bound by these Terms individually and on behalf of that organization.</p>                  ",
    },
    {
      title: "3. Accounts and Registration",
      content:
        "      <p>You can browse products without registering, but in order to purchase any product, you must register for an account. When you register for an account, you may be required to provide us with some information about yourself, such as your email address or other contact information. You agree that the information you provide to us is accurate and that you will keep it accurate and up-to-date at all times. When you register, you will be asked to provide a password. You are solely responsible for maintaining the confidentiality of your account and password, and you accept responsibility for all activities that occur under your account. If you have reason to believe that your account is no longer secure, then you must immediately notify us at [insert email address].</p>            ",
    },
    {
      title: "4. Electronic Communications; Text Messaging; Telephone Calls",
      content:
        "      <p>By providing Tantun with a telephone number and other contact information when registering for an account, you agree to receive communications, including via email and calls (including text messages and calls made using an autodialer or prerecorded voice message), from or on behalf of Tantun (or its affiliates, subsidiaries, employees, contractors, agents, business partners, or other third parties permitted to receive your information under the Tantun Privacy Policy) at the email address or telephone number you provided, even if that number is on a National or State Do Not Call List. These calls may be for information and marketing purposes, such as to provide you with information about Tantun services and your insurance options, for assistance with applications, and to provide reminders of deadlines. You are not required to provide your consent to these calls as a condition of any purchase on or through Tantun, and you may revoke any consent for marketing messages, phone calls, or text messages as described below. Standard text messaging and telephone minute charges applied by your cell phone carrier will apply. Tantun may, without further notice or warning and in our discretion, monitor and/or record telephone conversations for our business purposes, such as quality assurance and training purposes, and to protect our rights and the rights of others.</p>            <p><strong>Assistance.</strong> Reply HELP to a text message to receive help information about our Service or for any other questions, contact a Tantun customer representative at [insert phone number].</p>            <p><strong>Opt-Out.</strong> If you wish to opt out of marketing emails, you can unsubscribe by following the unsubscribe options in the email itself. If you wish to opt out of texts, you may reply STOP from the mobile device receiving the messages. If you wish to opt out of marketing calls or calls to a wireless number, then you may make a Do Not Call request either during a call you receive from us or by calling back the phone number provided during the call. To opt out of such texts or phone calls, you may also email us at [insert email address] with a request to stop receiving such texts or calls at a specified phone number. You understand and agree that you may: (i) continue to receive communications while Tantun processes your opt-out request; (ii) receive a communication confirming the receipt of your opt-out request; and (iii) after opting out of receiving marketing messages, continue to receive certain non-marketing communications by email or to a non-wireless number, such as confirmations or updates related to your account, insurance application or policy, or transactions through the Service. You may also manage your communication preferences as set forth in Section 4.3 below.</p>            <p><strong>Updating Information.</strong> You may correct or update your contact information by contacting us at [insert email address] or by mail at [insert mailing address]. Additionally, once you have created an account with us online at [insert website] or one of our other sites on the Service that allow account creation, you may update your name, email address, phone number (if part of your account), and password by clicking on the My Account or Log In or similar link on this website and signing in using your email address and password.</p>            ",
    },
    {
      title: "5. Payment",
      content:
        "      <p>If you provide payment information for purchasing or applying for a product, then you will pay the applicable company that provides such a product.</p>            ",
    },
    {
      title: "6. User Content",
      content:
        "      <p>Certain features of the Service may permit users to upload content to the Service (User Content) and to publish User Content on the Service. You retain copyright and any other proprietary rights that you may hold in the User Content that you post to the Service. By posting or publishing User Content, you grant Tantun a worldwide, non-exclusive, royalty-free, fully paid right and license (with the right to sublicense) to host, store, transfer, display, perform, reproduce, modify for the purpose of formatting for display, and distribute your User Content in whole or in part in any media formats and through any media channels now known or hereafter developed.</p>            <p><strong>User Content Representations and Warranties.</strong> You are solely responsible for your User Content and the consequences of posting or publishing User Content. By posting or publishing User Content, you represent and warrant that: (a) you are the creator and owner of the User Content or have the necessary licenses, rights, consents, and permissions to authorize Tantun and users of the Service to use and distribute your User Content as necessary to exercise the licenses granted by you in this section, in the manner contemplated by Tantun, the Service, and these Terms; and (b) your User Content and the use of your User Content as contemplated by these Terms does not and will not: (i) infringe, violate, or misappropriate any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; (ii) slander, defame, libel, or invade the right of privacy, publicity, or other property rights of any other person; or (iii) cause Tantun to violate any law or regulation.</p>            <p><strong>User Content Disclaimer. </strong>We are under no obligation to edit or control User Content that you or other users post or publish and will not be in any way responsible or liable for User Content. Tantun may, however, at any time and without prior notice, screen, remove, edit, or block any User Content that in our sole judgment violates these Terms or is otherwise objectionable. You understand that when using the Service, you will be exposed to User Content from a variety of sources and acknowledge that User Content may be inaccurate, offensive, indecent, or objectionable. You agree to waive, and do waive, any legal or equitable right or remedy you have or may have against Tantun with respect to User Content. We expressly disclaim any and all liability in connection</p>            <p>with User Content. If notified by a user or content owner that User Content allegedly does not conform to these Terms, we may investigate the allegation and determine in our sole discretion whether to remove the User Content, which we reserve the right to do at any time and without notice. For clarity, Tantun does not permit copyright-infringing activities on the Service.</p>            ",
    },
    {
      title: "7. Digital Millennium Copyright Act",
      content:
        "      <p><strong>DMCA Notification.</strong> We comply with the provisions of the Digital Millennium Copyright Act applicable to Internet service providers (17 U.S.C. , as amended). If you have an intellectual property rights-related complaint about material posted on the Service, you may contact our Designated Agent at the following address:</p>      <p><strong>Tantun Holdings</strong></p>      <p><strong>ATTN: Legal Department (Copyright Notification)</strong></p>      <p>[Insert mailing address]</p>      <p>Email: [Insert email address]</p>            <p>Any notice alleging that materials hosted by or distributed through the Service infringe intellectual property rights must include the following information:</p>      <p>1. An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other right being infringed;</p>      <p>2. A description of the copyright-protected work or other intellectual property right that you claim has been infringed;</p>      <p>3. A description of the material that you claim is infringing and where it is located on the Service;</p>      <p>4. Your address, telephone number, and email address;</p>      <p>5. A statement by you that you have a good faith belief that the use of those materials on the Service is not authorized by the copyright owner, its agent, or the law;</p>      <p>6. A statement by you that the above information in your notice is accurate and that, under penalty of perjury, you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner behalf.</p>            <p><strong>Repeat Infringers.</strong> Tantun will promptly terminate without notice the accounts of users that are determined by Tantun to be Repeat Infringers. A Repeat Infringer is a user who has been notified of infringing activity or has had User Content removed from the Service at least twice.</p>            ",
    },
    {
      title: "8. Prohibited Conduct",
      content:
        "      <p>BY USING THE SERVICE, YOU AGREE NOT TO:</p>      <p>- Use the Service for any illegal purpose or in violation of any local, state, national, or international law;</p>      <p>- Violate or encourage others to violate any right of a third party, including by infringing or misappropriating any third-party intellectual property right;</p>      <p>- Post, upload, or distribute any content (including by chatting with customer service) that is unlawful, defamatory, libelous, inaccurate, or that a reasonable person could deem to be objectionable, profane, indecent, pornographic, harassing, threatening, embarrassing, hateful, or otherwise inappropriate;</p>      <p>- Interfere with security-related features of the Service, including by: (a) disabling or circumventing features that prevent or limit use or copying of any content; or (b) reverse engineering or otherwise attempting to discover the source code of any portion of the Service, except to the extent that the activity is expressly permitted by applicable law;</p>      <p>- Interfere with the operation of the Service or any user enjoyment of the Service, including by: (a) uploading or otherwise disseminating any virus, adware, spyware, worm, or other malicious code; (b) making any unsolicited offer or advertisement to another user of the Service; (c) attempting to collect personal information about another user or third party without consent; or (d) interfering with or disrupting any network, equipment, or server connected to or used to provide the Service, or violating any regulation, policy, or procedure of any such network, equipment, or server;</p>      <p>- Perform any fraudulent activity, including impersonating any person or entity, claiming a false affiliation, accessing any other Service account without permission, or falsifying your age or date of birth;</p>      <p>- Sell or otherwise transfer the access granted under these Terms or any Materials (as defined in Section 13) or any right or ability to view, access, or use any Material;</p>      <p>- Use data mining, robots, or other data gathering devices on or through the Service;</p>      <p>- Attempt to do any of the acts described in this Section 8, or assist or permit any person in engaging in any of the acts described in this Section 8.</p>            ",
    },
    {
      title: "9. Third-Party Services and Linked Websites",
      content:
        "      <p>Tantun may provide tools through the Service that enable you to export information to third-party services. By using one of these tools, you agree that we may transfer that information to the applicable third-party service. Third-party services are not under our control, and we are not responsible for any third-party service use of your exported information. The Service may also contain links to third-party websites. Linked websites are not under our control, and you agree we are not responsible for their content.</p>            ",
    },
    {
      title:
        "10. Termination of Use; Discontinuation and Modification of the Service",
      content:
        "      <p>You may terminate your account at any time by contacting customer service, including by emailing [insert email address]. If you violate any provision of these Terms, your permission from us to use the Service will terminate automatically. In addition, Tantun may, in its sole discretion, terminate your user account on the Service or suspend or terminate your access to the Service at any time for any reason or no reason, with or without notice. We also reserve the right to modify or discontinue the Service at any time (including by limiting or discontinuing certain features of the Service), temporarily or permanently, without notice to you. You agree we will have no liability whatsoever on account of any change to the Service or any suspension or termination of your access to or use of the Service.</p>            ",
    },
    {
      title: "11. Privacy Policy; Additional Terms",
      content:
        "      <p><strong>Privacy Policy.</strong> Please read the Tantun Privacy Policy carefully for information relating to our collection, use, storage, and disclosure of your personal information. The Tantun Privacy Policy is incorporated by this reference into and made a part of these Terms.</p>            <p><strong>Additional Terms.</strong> Your use of the Service is subject to all additional terms, policies, rules, or guidelines applicable to the Service or certain features of the Service that we may post on or link to from the Service (the Additional Terms), such as end-user license agreements for any downloadable software applications or rules that are applicable to a particular feature or content on the Service, subject to Section 12. All Additional Terms are incorporated by this reference into and made a part of these Terms.</p>            ",
    },
    {
      title: "12. Modification of these Terms",
      content:
        "      <p>We reserve the right, at our discretion, to change these Terms on a going-forward basis at any time. Please check these Terms periodically for changes. If a change to these Terms materially modifies your rights or obligations, you may be required to indicate your assent to the modified Terms. Notwithstanding the foregoing, any use of the Service after the Terms are modified constitutes your acceptance of the modified Terms. Disputes arising under these Terms will be resolved in accordance with the version of these Terms that was in effect at the time the dispute arose.</p>            ",
    },
    {
      title: "13. Ownership; Proprietary Rights",
      content:
        "      <p>The Service is owned and operated by Tantun. The visual interfaces, graphics, design, compilation, information, data, computer code (including source code or object code), products, software, services, and all other elements of the Service (Materials) provided by Tantun are protected by intellectual property and other laws. All Materials included in the Service are the property of Tantun or our third-party licensors. Except as expressly authorized by Tantun, you may not make use of the Materials. Tantun reserves all rights to the Materials not granted expressly in these Terms.</p>            ",
    },
    {
      title: "14. Feedback",
      content:
        "      <p>If you choose to provide input and suggestions regarding problems with or proposed modifications or improvements to the Service (Feedback), then you hereby grant Tantun an unrestricted, perpetual, irrevocable, non-exclusive, fully-paid, royalty-free right to exploit the Feedback in any manner and for any purpose, including to improve the Service and create other products and services.</p>            ",
    },
    {
      title: "15. Indemnity",
      content:
        "      <p>To the fullest extent permitted by law, you are responsible for your use of the Service, and you will defend and indemnify Tantun and its officers, directors, employees, consultants, affiliates, subsidiaries, agents, business partners, and other third parties permitted to receive your information under the Tantun Privacy Policy (together the Tantun Entities) from and against every claim, liability, damage, loss, and expense, including reasonable attorneys fees and costs, arising out of or in any way connected with: (a) your access to, use of, or alleged use of the Service; (b) your violation of any portion of these Terms, any representation, warranty, or agreement referenced in these Terms, or any applicable law or regulation; (c) your violation of any third-party right, including any intellectual property right or publicity, confidentiality, other property, or privacy right; or (d) any dispute or issue between you and any third party. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you (without limiting your indemnification obligations with respect to that matter), and in that case, you agree to cooperate with our defense of that claim.</p>            ",
    },
    {
      title: "16. Disclaimers; No Warranties",
      content:
        "      <p>THE SERVICE AND ALL MATERIALS AND CONTENT AVAILABLE THROUGH THE SERVICE ARE PROVIDED AS IS AND ON AN AS AVAILABLE BASIS WITHOUT WARRANTY OR CONDITION OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, THE TANTUN ENTITIES DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, RELATING TO THE SERVICE AND ALL MATERIALS AND CONTENT AVAILABLE THROUGH THE SERVICE, INCLUDING: (A) ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, OR NON</p>            <p>-INFRINGEMENT; AND (B) ANY WARRANTY ARISING OUT OF COURSE OF DEALING, USAGE, OR TRADE. TO THE FULLEST EXTENT PERMITTED BY LAW, THE TANTUN ENTITIES DO NOT WARRANT THAT THE SERVICE OR ANY PORTION OF THE SERVICE, OR ANY MATERIALS OR CONTENT OFFERED THROUGH THE SERVICE, WILL BE UNINTERRUPTED, SECURE, OR FREE OF ERRORS, VIRUSES, OR OTHER HARMFUL COMPONENTS, AND DO NOT WARRANT THAT ANY OF THOSE ISSUES WILL BE CORRECTED.</p>            <p>NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM THE SERVICE OR ANY MATERIALS OR CONTENT AVAILABLE THROUGH THE SERVICE WILL CREATE ANY WARRANTY REGARDING ANY OF THE TANTUN ENTITIES OR THE SERVICE THAT IS NOT EXPRESSLY STATED IN THESE TERMS. TO THE FULLEST EXTENT PERMITTED BY LAW, YOU ASSUME ALL RISK FOR ANY DAMAGE THAT MAY RESULT FROM YOUR USE OF OR ACCESS TO THE SERVICE, YOUR DEALING WITH ANY OTHER SERVICE USER, AND ANY MATERIALS OR CONTENT AVAILABLE THROUGH THE SERVICE. YOU UNDERSTAND AND AGREE THAT YOU USE THE SERVICE AND USE, ACCESS, DOWNLOAD, OR OTHERWISE OBTAIN MATERIALS OR CONTENT THROUGH THE SERVICE AND ANY ASSOCIATED SITES OR SERVICES AT YOUR OWN DISCRETION AND RISK, AND TO THE FULLEST EXTENT PERMITTED BY LAW, YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR PROPERTY (INCLUDING YOUR COMPUTER SYSTEM OR MOBILE DEVICE USED IN CONNECTION WITH THE SERVICE) OR THE LOSS OF DATA THAT RESULTS FROM THE USE OF THE SERVICE OR THE DOWNLOAD OR USE OF THAT MATERIAL OR CONTENT.</p>            ",
    },
    {
      title: "17. Limitation of Liability",
      content:
        "      <p>TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE TANTUN ENTITIES BE LIABLE TO YOU FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING DAMAGES FOR LOSS OF PROFITS, GOODWILL, OR ANY OTHER INTANGIBLE LOSS) ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR YOUR INABILITY TO ACCESS OR USE, THE SERVICE OR ANY MATERIALS OR CONTENT ON THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT ANY TANTUN ENTITY HAS BEEN INFORMED OF THE POSSIBILITY OF DAMAGE.</p>            <p>TO THE FULLEST EXTENT PERMITTED BY LAW, AND EXCEPT AS PROVIDED IN SECTION 21.4(iii), THE AGGREGATE POTENTIAL LIABILITY OF THE TANTUN ENTITIES TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE USE OF OR ANY INABILITY TO USE ANY PORTION OF THE SERVICE OR OTHERWISE UNDER THESE TERMS, WHETHER IN CONTRACT, TORT, OR OTHERWISE, IS LIMITED TO $100.</p>            <p>EACH PROVISION OF THESE TERMS THAT PROVIDES FOR A LIMITATION OF LIABILITY, DISCLAIMER OF WARRANTIES, OR EXCLUSION OF DAMAGES IS INTENDED TO AND DOES ALLOCATE THE RISKS BETWEEN THE PARTIES UNDER THESE TERMS. THIS ALLOCATION IS AN ESSENTIAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN THE PARTIES. EACH OF THESE PROVISIONS IS SEVERABLE AND INDEPENDENT OF ALL OTHER PROVISIONS OF THESE TERMS. THE LIMITATIONS IN THIS SECTION 17 WILL APPLY EVEN IF ANY LIMITED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.</p>            ",
    },
    {
      title: "18. No Advice",
      content:
        "      <p>The Materials are for informational purposes only. No Material is intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the Service. If you think you may have a medical emergency, call your doctor or 911 immediately. Tantun does not recommend or endorse any specific tests, physicians, products, procedures, opinions, insurance coverage, or other information that may be mentioned on the Service. Reliance on any information provided by Tantun, Tantun employees, or other visitors to the Service is solely at your own risk.</p>            ",
    },
    {
      title: "19. Governing Law",
      content:
        "      <p>These Terms are governed by the laws of the State of [insert state], without regard to conflict of law principles. If a lawsuit or court proceeding is permitted under these Terms, then you and Tantun agree to submit to the personal and exclusive jurisdiction of the state courts and federal courts located within [insert county], [insert state], for the purpose of litigating any dispute. We operate the Service from our offices in [insert state], and we make no representation that Materials included in the Service are appropriate or available for use in other locations.</p>            ",
    },
    {
      title: "20. General",
      content:
        "      <p>These Terms, together with the Privacy Policy and any other agreements expressly incorporated by reference into these Terms, are the entire and exclusive understanding and agreement between you and Tantun regarding your use of the Service. Except as expressly permitted above, these Terms may be amended only by a written agreement signed by authorized representatives of all parties to these Terms. You may not assign or transfer these Terms or your rights under these Terms, in whole or in part, by operation of law or otherwise, without our prior written consent. We may assign these Terms at any time without notice or consent. The failure to require performance of any provision will not affect our right to require performance at any other time after that, nor will a waiver by us of any breach or default of these Terms or any provision of these Terms be a waiver of any subsequent breach or default or a waiver of the provision itself. Use of section headers in these Terms is for convenience only and will not have any impact on the interpretation of any provision. If any part of these Terms is held to be invalid or unenforceable, the unenforceable part will be given effect to the fullest extent permitted by law, and the remaining parts will remain in full force and effect. Upon termination of these Terms, Sections 2, 4, and 6 through 22, along with the Privacy Policy and any other accompanying agreements, will survive.</p>            ",
    },
    {
      title: "21. Dispute Resolution and Arbitration",
      content:
        "      <p><strong>Generally.</strong> In the interest of resolving disputes between you and Tantun in the most expedient and cost-effective manner, you and Tantun agree that any dispute arising out of or in any way related to these Terms or your use of the Service will be resolved by binding arbitration. Arbitration is less formal than a lawsuit in court. Arbitration uses a neutral arbitrator instead of a judge or jury, may allow for more limited discovery than in court, and can be subject to very limited review by courts. Arbitrators can award the same damages and relief that a court can award. This agreement to arbitrate disputes includes all claims arising out of or in any way related to these Terms or your use of the Service, whether based in contract, tort, statute, fraud, misrepresentation, or any other legal theory, and regardless of whether a claim arises during or after the termination of these Terms. YOU UNDERSTAND AND AGREE THAT BY ENTERING INTO THESE TERMS, YOU AND TANTUN ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.</p>            <p><strong>Exceptions.</strong> Despite the provisions of Section 21.1 above, nothing in these Terms will be deemed to waive, preclude, or otherwise limit the right of either party to: (a) bring an individual action in small claims court; (b) pursue an enforcement action through the applicable federal, state, or local agency if that action is available; (c) seek injunctive relief in a court of law; or (d) to file suit in a court of law to address an intellectual property infringement claim (including any claim based on the unauthorized use of the Service).</p>            <p><strong>Arbitrator.</strong> Any arbitration between you and Tantun will be governed by the Federal Arbitration Act and governed by the Commercial Dispute Resolution Procedures and the Supplementary Procedures for Consumer Related Disputes (collectively AAA Rules) of the American Arbitration Association (AAA) as modified by these Terms and will be administered by the AAA. The AAA Rules and filing forms are available online at www.adr.org, by calling the AAA at 1-800-778-7879, or by contacting Tantun. The arbitrator has exclusive authority to resolve any dispute relating to the interpretation, applicability, or enforceability of this binding arbitration agreement.</p>            <p><strong>Notice; Process.</strong> A party who intends to seek arbitration must first send a written notice of the dispute to the other party by U.S. Mail or electronic mail (Notice). Tantun address for Notice is: [insert address] or [insert email address]. The Notice must: (a) describe the nature and basis of the claim or dispute; and (b) set forth the specific relief sought (Demand). The parties will make good faith efforts to resolve the claim directly, but if the parties do not reach an agreement to do so within 30 days after the Notice is received, you or Tantun may commence an arbitration proceeding. During the arbitration, the amount of any settlement offer made by you or Tantun must not be disclosed to the arbitrator until after the arbitrator makes a final decision and award, if any. If the dispute is finally resolved through arbitration in your favor, Tantun will pay you the highest of the following: (i) the amount awarded by the arbitrator, if any; (ii) the last written settlement amount offered by Tantun in settlement of the dispute prior to the arbitrator award; or (iii) $1000.</p>            <p><strong>Fees.</strong> If you commence arbitration in accordance with these Terms, Tantun will reimburse you for your payment of the filing fee unless your claim is for more than $15,000, or as set forth below, in which case the payment of any fees will be decided by the AAA Rules. Any arbitration hearing will take place at a location to</p>            <p>be agreed upon in [insert county], [insert state], but if the claim is for $15,000 or less, you may choose whether the arbitration will be conducted: (a) solely on the basis of documents submitted to the arbitrator; (b) through a non-appearance based telephone hearing; or (c) by an in-person hearing as established by the AAA Rules in the county (or parish) of your billing address. If the arbitrator finds that either the substance of your claim or the relief sought in the Demand is frivolous or brought for an improper purpose (as measured by the standards set forth in Federal Rule of Civil Procedure 11(b)), then the payment of all fees will be governed by the AAA Rules. In that case, you agree to reimburse Tantun for all monies previously disbursed by it that are otherwise your obligation to pay under the AAA Rules. Regardless of the manner in which the arbitration is conducted, the arbitrator must issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the decision and award, if any, are based. The arbitrator may make rulings and resolve disputes as to the payment and reimbursement of fees or expenses at any time during the proceeding, and upon request from either party made within 14 days of the arbitrator ruling on the merits.</p>            <p><strong>No Class Actions.</strong> YOU AND TANTUN AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you and Tantun agree otherwise, the arbitrator may not consolidate more than one person claims and may not otherwise preside over any form of a representative or class proceeding.</p>            <p><strong>Modifications to this Arbitration Provision.</strong> If Tantun makes any future change to this arbitration provision, other than a change to Tantun address for Notice, you may reject the change by sending us written notice within 30 days of the change to Tantun address for Notice, in which case this arbitration provision, as in effect immediately prior to the changes you rejected, will continue to govern any disputes between you and Tantun.</p>            <p><strong>Enforceability.</strong> If Section 21.6 is found to be unenforceable, or if the entirety of this Section 21 is found to be unenforceable, then the entirety of this Section 21 will be null and void. In that case, the parties agree that the exclusive jurisdiction and venue described in Section 19 will govern any action arising out of or related to these Terms or your use of the Service.</p>            <p><strong>Opt Out.</strong> Arbitration is not a mandatory condition of these Terms. If you do not want to be subject to this Dispute Resolution and Arbitration provision, you may opt out of this Dispute Resolution and Arbitration provision by notifying Tantun in writing of your decision either by sending within thirty (30) days of the date you accept these Terms (1) an electronic message to [insert email address] stating clearly your name and intent to opt out of the Dispute Resolution and Arbitration provision, or (2) a letter sent by overnight mail by any nationally recognized delivery service (e.g., UPS, Federal Express, etc.) or by hand delivery to: [insert address]. In order to be effective, the letter under option (2) must clearly indicate your intent to opt out of this Dispute Resolution and Arbitration provision and must be dated and signed. If emailed or hand-delivered, the signed letter must be received within thirty (30) days of your acceptance of these Terms. If sent by overnight delivery service, the letter must be submitted for delivery to the delivery service within thirty (30) days from the date you accept these Terms. Should you choose not to opt out of this Dispute Resolution and Arbitration provision within the 30-day period, you and Tantun will be bound by the terms of this Dispute Resolution and Arbitration provision. You have the right to consult with counsel of your choice concerning this Dispute Resolution and Arbitration provision. You understand that you will not be subject to retaliation if you exercise your right to opt out of coverage under this Dispute Resolution and Arbitration provision.</p>            ",
    },
    {
      title: "22. Consent to Communications",
      content:
        "      <p>By using the Service and subject to Section 4, you consent to receiving certain electronic communications from us, as further described in our Privacy Policy. Please read our Privacy Policy to learn more about our electronic communications practices. You agree that any notices, agreements, disclosures, or other communications that we send to you electronically will satisfy any legal communication requirements, including that those communications be in writing.</p>            ",
    },

    {
      title: "23. Contact Information",
      content:
        "      <p>The Service is offered by Tantun Holdings, located at [insert address]. You may contact us by sending correspondence to that address or by emailing us at [insert email address].</p>            ",
    },
  ];

  // Handle scroll event to show or hide the "Go to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 px-6  min-h-screen">
        <div className="mx-12 text-sm text-justify p-6 bg-white">
          <h1 className="text-3xl font-bold text-primary mb-6">Terms of Use</h1>
          <p className="text-primaryBlack mb-4">Updated Oct 12, 2024</p>

          <div className="mb-4 border-b border-[#EDEDED]">
            <div className="flex justify-between items-center w-full py-4 text-left text-primaryBlack font-semibold">
              Introduction
            </div>
            <div className="pb-4 text-textGray mb-4 space-y-2">
              <p>
                Welcome and thank you for your interest in Tantun Holdings
                (Tantun, or us) and our websites at TantunHoldings.com, and
                other websites where we post this document as the applicable
                terms of use along with any related websites, networks,
                applications, insurance agent and representative services, and
                communication channels (including online chat and telephone call
                centers), and other services provided by us (collectively our
                Service). These Terms of Use are a legally binding contract
                between you and Tantun regarding your use of the Service.
              </p>
              <p>PLEASE READ THE FOLLOWING TERMS CAREFULLY...</p>
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="mb-4 border-b border-[#EDEDED]">
              <button
                className="flex justify-between items-center w-full py-4 text-left text-primary font-semibold"
                onClick={() => toggleSection(index)}
              >
                {section.title}
                {expandedSection === index ? (
                  <ChevronUp className="text-primary" />
                ) : (
                  <ChevronDown className="text-primary" />
                )}
              </button>
              {expandedSection === index && (
                <div
                  className="pb-4 text-textGray space-y-2"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>
          ))}

          <div className="mt-8 text-sm text-primaryBlack space-y-2">
            <p>
              This website and its contents are for informational purposes
              only...
            </p>
            <p>Tantun Medicare website is operated by Tantun Holdings...</p>
          </div>

          {/* Floating "Go to Top" Button */}
          {showButton && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primaryDark focus:outline-none"
            >
              <ArrowUp />
            </button>
          )}
        </div>
      </div>
      <Disclaimer />
    </>
  );
};

export default TermsOfUse;
