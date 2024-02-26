import { DocumentFieldMap } from '@atj/forms';
import { PDFDocument, getDocumentFieldData, parsedPDF } from './pdf';

export type SuggestedForm = {
  id: string;
  tag: 'input' | 'textarea';
  name: string;
  label: string;
  value?: string;
  type?: 'text';
}[];

export const suggestFormDetails = async (
  rawData: Uint8Array,
  rawFields: DocumentFieldMap
): Promise<DocumentFieldMap> => {
  const cache = getFakeCache();
  const hash = await getObjectHash(rawData);
  console.log('hash', hash);
  const newFields = cache.get(hash);
  console.log('newFields', newFields);
  return newFields || rawFields;
  // return rawFields;
};

const getFakeCache = () => {
  const cache = {
    'hardcoded-hash': UD105_TEST_DATA,
    '179be8c1c78b01ed7c45569912c2bb862ec3764617f908ebc29178e36fd6316d':
      parsedPDF,
  } as { [key: string]: any };
  return {
    get(hashKey: string) {
      return cache[hashKey];
    },
  };
};

const getObjectHash = async (buffer: Uint8Array) => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = new Uint8Array(hashBuffer);
  const hashHex = hashArray.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, '0'),
    ''
  );
  return hashHex;
};

export const AL_NAME_TEST_DATA = {
  Radio_group_test: {
    type: 'RadioGroup',
    name: 'Radio_group_test',
    label: 'Radio_group_test',
    value: '',
    groupId: 3,
    instructions: 'Select something.',
    required: true,
  },
  Some_random_key_name: {
    type: 'Paragraph',
    name: 'Some_random_key_name',
    value: 'Your current name: ',
    groupId: 3,
  },
  Current_First_Name1: {
    type: 'TextField',
    name: 'Current_First_Name1',
    label: 'Current_First_Name1',
    value: 'Short answer',
    groupId: 3,
    instructions: 'Type your current first name.',
    required: true,
  },
  Current_Middle_Name1: {
    type: 'TextField',
    name: 'Current_Middle_Name1',
    label: 'Current_Middle_Name1',
    value: 'Short answer',
    groupId: 3,
    instructions: 'Type your current middle name.',
    required: true,
  },
  Current_Last_Name1: {
    type: 'TextField',
    name: 'Current_Last_Name1',
    label: 'Current_Last_Name1',
    value: 'Short answer',
    groupId: 3,
    instructions: 'Type your current last name.',
    required: true,
  },
};

export const UD105_TEST_DATA = [
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].CaseNumber[0].CaseNumber[0]',
    id: 'pdf-obj-0-4',
    value: '',
    label: 'CASE NUMBER',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].AttyBarNo[0]',
    id: 'pdf-obj-0-5',
    value: '',
    label: 'STATE BAR NUMBER',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Name[0]',
    id: 'pdf-obj-0-6',
    value: '',
    label: 'NAME',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].AttyFirm[0]',
    id: 'pdf-obj-0-7',
    value: '',
    label: 'FIRM NAME',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Street[0]',
    id: 'pdf-obj-0-8',
    value: '',
    label: 'STREET ADDRESS',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].City[0]',
    id: 'pdf-obj-0-9',
    value: '',
    label: 'CITY',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].State[0]',
    id: 'pdf-obj-0-10',
    value: '',
    label: 'STATE',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Zip[0]',
    id: 'pdf-obj-0-11',
    value: '',
    label: 'ZIP CODE',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Phone[0]',
    id: 'pdf-obj-0-12',
    value: '',
    label: 'Telephone number:',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Fax[0]',
    id: 'pdf-obj-0-13',
    value: '',
    label: 'Fax number',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Email[0]',
    id: 'pdf-obj-0-14',
    value: '',
    label: 'E-MAIL ADDRESS:',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].AttyFor[0]',
    id: 'pdf-obj-0-15',
    value: '',
    label: 'ATTORNEY FOR name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtCounty[0]',
    id: 'pdf-obj-0-16',
    value: '',
    label: 'SUPERIOR COURT OF CALIFORNIA, COUNTY OF',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtStreet[0]',
    id: 'pdf-obj-0-17',
    value: '',
    label: 'STREET ADDRESS',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtMailingAdd[0]',
    id: 'pdf-obj-0-18',
    value: '',
    label: 'MAILING ADDRESS',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtCityZip[0]',
    id: 'pdf-obj-0-19',
    value: '',
    label: 'CITY AND ZIP CODE',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtBranch[0]',
    id: 'pdf-obj-0-20',
    value: '',
    label: 'BRANCH NAME',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].TitlePartyName[0].Party1[0]',
    id: 'pdf-obj-0-21',
    value: '',
    label: 'PLAINTIFF',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page1[0].P1Caption[0].TitlePartyName[0].Party2[0]',
    id: 'pdf-obj-0-22',
    value: '',
    label: 'DEFENDANT',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page1[0].List1[0].item1[0].FillField1[0]',
    id: 'pdf-obj-0-23',
    label:
      'Defendant all defendants for whom this answer is filed must be named and must sign this answer unless their attorney signs',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page1[0].List2[0].Lia[0].Check1[0]',
    id: 'pdf-obj-0-24',
    value: '1',
    label:
      'General Denial (Do not check this box if the complaint demands more than $1,000.)\n    Defendant generally denies each statement of the complaint and of the Mandatory Cover Sheet and Supplemental AllegationsUnlawful Detainer (form UD-101).',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].Check2[0]',
    id: 'pdf-obj-0-25',
    value: '2',
    label:
      'Specific Denials (Check this box and complete (1) and (2) below if complaint demands more than $1,000.)\n    Defendant admits that all of the statements of the complaint and of the Mandatory Cover Sheet and Supplemental AllegationsUnlawful Detainer (form UD-101) are true EXCEPT:',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lia[0].FillField2[0]',
    id: 'pdf-obj-0-26',
    label:
      'Defendant claims the following statements of the complaint are false state paragraph numbers from the complaint or explain here or, if more room needed, on form MC-025',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lia[0].Check3[0]',
    id: 'pdf-obj-0-27',
    value: '1',
    label: 'Explanation is on form MC-025, titled as Attachment 2b(1)(a).',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lib[0].Check4[0]',
    id: 'pdf-obj-0-28',
    value: '1',
    label: 'Explanation is on form MC-025, titled as Attachment 2b(1)(b).',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lib[0].FillField3[0]',
    id: 'pdf-obj-0-29',
    label: 'state paragraph numbers from the complaint or explain here',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lia[0].Check5[0]',
    id: 'pdf-obj-0-30',
    value: '1',
    label:
      "Defendant did not receive plaintiff's Mandatory Cover Sheet and Supplemental Allegations (form UD-101). (If not checked, complete (b) and (c), as appropriate.)",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lib[0].Check5[0]',
    id: 'pdf-obj-0-31',
    value: '1',
    label:
      "Defendant claims the statements in the Verification required for issuance of summonsresidential, item 3 of plaintiff's Mandatory Cover Sheet and Supplemental Allegations (form UD-101), are false.",
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lic[0].FillField4[0]',
    id: 'pdf-obj-0-32',
    label:
      'Defendant claims the following statements on the Mandatory Cover Sheet and Supplemental AllegationsUnlawful Detainer form UD-101 are false state paragraph numbers from form UD-101 or explain here or, if more room needed, on form MC-025',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lic[0].Check6[0]',
    id: 'pdf-obj-0-33',
    value: '1',
    label: 'Explanation is on form MC-025, titled as Attachment 2b(2)(c).',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page2[0].PxCaption[0].CaseNumber[0].CaseNumber[0]',
    id: 'pdf-obj-1-4',
    value: '',
    label: 'CASE NUMBER:',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page2[0].PxCaption[0].TitlePartyName[0].Party1[0]',
    id: 'pdf-obj-1-5',
    value: '',
    label: 'PLAINTIFF',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page2[0].PxCaption[0].TitlePartyName[0].Party2[0]',
    id: 'pdf-obj-1-6',
    value: '',
    label: 'DEFENDANT',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page2[0].List2[0].Lib[0].Sublib[0].Li2[0].Subitem2[0].Lid[0].FillField5[0]',
    id: 'pdf-obj-1-7',
    label:
      'Defendant has no information or belief that the following statements on the Mandatory Cover Sheet and Supplemental AllegationsUnlawful Detainer form UD-101 are true, so defendant denies them state paragraph numbers from form UD-101 or explain here or, if more room needed, on form MC-025',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List2[0].Lib[0].Sublib[0].Li2[0].Subitem2[0].Lid[0].Check7[0]',
    id: 'pdf-obj-1-8',
    value: '1',
    label: 'Explanation is on form MC-025, titled as Attachment 2b(2)(d).',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lia[0].Check8[0]',
    id: 'pdf-obj-1-10',
    value: '1',
    label:
      '(Nonpayment of rent only) Plaintiff has breached the warranty to provide habitable premises.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lib[0].Check9[0]',
    id: 'pdf-obj-1-11',
    value: '1',
    label:
      '(Nonpayment of rent only) Defendant made needed repairs and properly deducted the cost from the rent, and plaintiff did  not give proper credit.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lic[0].Check10[0]',
    id: 'pdf-obj-1-12',
    value: '1',
    label: '(Nonpayment of rent only)',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page2[0].List3[0].Lic[0].Date1[0]',
    id: 'pdf-obj-1-13',
    value: '',
    label: 'on date',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lid[0].Check11[0]',
    id: 'pdf-obj-1-14',
    value: '1',
    label: 'Plaintiff waived, changed, or canceled the notice to quit.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lie[0].Check12[0]',
    id: 'pdf-obj-1-15',
    value: '1',
    label:
      'Plaintiff served defendant with the notice to quit or filed the complaint to retaliate against defendant.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lif[0].Check13[0]',
    id: 'pdf-obj-1-16',
    value: '1',
    label:
      'By serving defendant with the notice to quit or filing the complaint, plaintiff is arbitrarily discriminating against the defendant in violation of the Constitution or the laws of the United States or California.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lig[0].Check14[0]',
    id: 'pdf-obj-1-17',
    value: '1',
    label:
      "Plaintiff's demand for possession violates the local rent control or eviction control ordinance of",
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page2[0].List3[0].Lig[0].FillField6[0]',
    id: 'pdf-obj-1-18',
    value: '',
    label: 'city or county, title of  ordinance, and date of passage',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lih[0].Check15[0]',
    id: 'pdf-obj-1-19',
    value: '1',
    label:
      "Plaintiff's demand for possession is subject to the Tenant Protection Act of 2019, Civil Code section 1946.2 or 1947.12, and is not in compliance with the act. (Check all that apply and briefly state in item 3w the facts that support each.)",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li1[0].Check16[0]',
    id: 'pdf-obj-1-20',
    value: '1',
    label:
      'Plaintiff failed to state a just cause for termination of tenancy in the written notice to terminate.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li2[0].Check17[0]',
    id: 'pdf-obj-1-21',
    value: '1',
    label:
      'Plaintiff failed to provide an opportunity to cure any alleged violations of terms and conditions of the lease (other than payment of rent) as required under Civil Code section 1946.2(c).',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li3[0].Check18[0]',
    id: 'pdf-obj-1-22',
    value: '1',
    label:
      'Plaintiff failed to comply with the relocation assistance requirements of Civil Code section 1946.2(d).',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li4[0].Check19[0]',
    id: 'pdf-obj-1-23',
    value: '1',
    label:
      'Plaintiff has raised the rent more than the amount allowed under Civil Code section 1947.12, and the only unpaid rent is the unauthorized amount.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li5[0].Check20[0]',
    id: 'pdf-obj-1-24',
    value: '1',
    label:
      'Plaintiff violated the Tenant Protection Act in another manner that defeats the complaint.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lii[0].Check21[0]',
    id: 'pdf-obj-1-25',
    value: '1',
    label:
      'Plaintiff accepted rent from defendant to cover a period of time after the date the notice to quit expired.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lij[0].Check22[0]',
    id: 'pdf-obj-1-26',
    value: '1',
    label:
      "Plaintiff seeks to evict defendant based on an act against defendant or a member of defendant's household that constitutes domestic violence, sexual assault, stalking, human trafficking, or abuse of an elder or a dependent adult. (This defense requires one of the following: (1) a temporary restraining order, protective order, or police report that is not more than 180 days old; OR (2) a signed statement from a qualified third party (e.g., a doctor, domestic violence or sexual assault counselor, human trafficking caseworker, or psychologist) concerning the injuries or abuse resulting from these acts).)",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lik[0].Check23[0]',
    id: 'pdf-obj-1-27',
    value: '1',
    label:
      'Plaintiff seeks to evict defendant based on defendant or another person calling the police or emergency assistance (e.g., ambulance) by or on behalf of a victim of abuse, a victim of crime, or an individual in an emergency when defendant or the other person believed that assistance was necessary.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lil[0].Check24[0]',
    id: 'pdf-obj-1-28',
    value: '1',
    label:
      "Plaintiff's demand for possession of a residential property is in retaliation for nonpayment of rent or other financial obligations due between March 1, 2020, and September 30, 2021, even though alleged to be based on other reasons. (Civil Code, section 1942.5(d); Governmental Code, section 12955.)",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lim[0].Check25[0]',
    id: 'pdf-obj-1-29',
    value: '1',
    label:
      "Plaintiff's demand for possession of a residential property is based on nonpayment of rent or other financial obligations due between March 1, 2020, and September 30, 2021, and (check all that apply):",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li1[0].Check26[0]',
    id: 'pdf-obj-1-30',
    value: '1',
    label:
      'Plaintiff did not serve the general notice or notices of rights under the COVID-19 Tenant Relief Act as required by Code of Civil Procedure section 1179.04.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li2[0].Check27[0]',
    id: 'pdf-obj-1-31',
    value: '1',
    label:
      'Plaintiff did not serve the required 15-day notice. (Code Civil Procedure, section 1179.03(b) or (c).)',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page3[0].PxCaption[0].CaseNumber[0].CaseNumber[0]',
    id: 'pdf-obj-2-4',
    value: '',
    label: 'CASE NUMBER:',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page3[0].PxCaption[0].TitlePartyName[0].Party1[0]',
    id: 'pdf-obj-2-5',
    value: '',
    label: 'PLAINTIFF',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page3[0].PxCaption[0].TitlePartyName[0].Party2[0]',
    id: 'pdf-obj-2-6',
    value: '',
    label: 'DEFENDANT',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li3[0].Check28[0]',
    id: 'pdf-obj-2-7',
    value: '1',
    label:
      'Plaintiff did not provide an unsigned declaration of COVID-19  related financial distress with the 15-day notice. (Code Civil Procedure, section 1179.03(d).)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li4[0].Check29[0]',
    id: 'pdf-obj-2-8',
    value: '1',
    label:
      'Plaintiff did not provide an unsigned declaration of COVID-19related financial distress in the language in which the landlord was required to provide a translation of the rental agreement. (Code Civil Procedure, section 1179.03(d).)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li5[0].Check30[0]',
    id: 'pdf-obj-2-9',
    value: '1',
    label:
      'Plaintiff identified defendant as a high-income tenant in the 15-day notice, but plaintiff did not possess proof at the time the notice was served establishing that defendant met the definition of high-income tenant. (Code Civil Procedure, section 1179.02.5(b).)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lia[0].Check31[0]',
    id: 'pdf-obj-2-10',
    value: '1',
    label:
      'Defendant delivered to plaintiff one or more declarations of COVID-19related financial distress and, if required as a "high-income tenant," documentation in support. (Code Civil Procedure, sections 1179.03(f) and 1179.02.5.)',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lia[0].FillField7[0]',
    id: 'pdf-obj-2-11',
    label:
      '(Describe when and how delivered and check all other items below that apply):',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lib[0].Check32[0]',
    id: 'pdf-obj-2-12',
    value: '1',
    label:
      "Plaintiff's demand for payment includes late fees on rent or other financial obligations due between March 1, 2020, and September 30, 2021.",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lic[0].Check33[0]',
    id: 'pdf-obj-2-13',
    value: '1',
    label:
      "Plaintiff's demand for payment includes fees for services that were increased or not previously charged.",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lid[0].Check34[0]',
    id: 'pdf-obj-2-14',
    value: '1',
    label:
      'Defendant, on or before September 30, 2021, paid or offered plaintiff payment of at least 25% of the total rental payments that were due between September 1, 2020, and September 30, 2021, and that were demanded in the termination notices for which defendant delivered the declarations described in (a). (Code Civil Procedure,                   section 1179.03(g)(2).)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li7[0].Check35[0]',
    id: 'pdf-obj-2-15',
    value: '1',
    label:
      'Defendant is currently filing or has already filed a declaration of COVID-19related financial distress with the court. (Code Civil Procedure, section 1179.03(h).)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lin[0].Check36[0]',
    id: 'pdf-obj-2-16',
    value: '1',
    label:
      "Plaintiff's demand for possession of a residential property is based on nonpayment of rent or other financial obligations due between October 1, 2021, and March 31, 2022, and (check all that apply):",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].Check35[0]',
    id: 'pdf-obj-2-17',
    value: '1',
    label: "Plaintiff's notice to quit was served before April 1, 2022, and",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lia[0].CheckBox190[0]',
    id: 'pdf-obj-2-18',
    value: '1',
    label:
      'Did not contain the required contact information for the pertinent governmental rental assistance program, or the other content required by Code of Civil Procedure section 1179.10(a).',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lib[0].CheckBox192[0]',
    id: 'pdf-obj-2-19',
    value: '1',
    label:
      'Did not did not include a translation of the statutorily required notice. (Code Civil Procedure, section 1179.10(a)(2) and Civil Code, section 1632.)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li2[0].Check35[0]',
    id: 'pdf-obj-2-20',
    value: '1',
    label:
      "Plaintiff's notice to quit was served between April 1, 2022, and June 30, 2022, and did not contain the required information about the government rental assistance program and possible protections, as required by Code of Civil Procedure section 1179.10(b).",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lio[0].Check37[0]',
    id: 'pdf-obj-2-21',
    value: '1',
    label:
      "For a tenancy initially established before October 1, 2021, plaintiff's demand for possession of a residential property is based on nonpayment of rent or other financial obligations due between March 1, 2020, and March 31, 2022, and (check all that apply):",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li1[0].Check35[0]',
    id: 'pdf-obj-2-22',
    value: '1',
    label:
      'Plaintiff did not complete an application for rental assistance to cover the rental debt demanded in the complaint before filing the complaint in this action.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li2[0].Check35[0]',
    id: 'pdf-obj-2-23',
    value: '1',
    label: "Plaintiff's application for rental assistance was not denied.",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].Check35[0]',
    id: 'pdf-obj-2-24',
    value: '1',
    label:
      "Plaintiff's application for rental assistance was denied for a reason that does not support issuance of a summons or judgment in an unlawful detainer action (check all that apply):",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lia[0].Check32[0]',
    id: 'pdf-obj-2-25',
    value: '1',
    label:
      "Plaintiff did not fully or properly complete plaintiff's portion of the application. (Code Civil Procedure,                             section 1179.09(d)(2)(A).)",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lib[0].Check33[0]',
    id: 'pdf-obj-2-26',
    value: '1',
    label:
      'Plaintiff did not apply to the correct rental assistance program. (Code Civil Procedure, section 1179.09(d)(2)(C).)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li4[0].Check35[0]',
    id: 'pdf-obj-2-27',
    value: '1',
    label:
      'An application for rental assistance was filed before April 1, 2022, and the determination is still pending.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li5[0].Check35[0]',
    id: 'pdf-obj-2-28',
    value: '1',
    label:
      'Rental assistance has been approved and tenant is separately filing an application to prevent forfeiture (form UD-125).',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lip[0].Check38[0]',
    id: 'pdf-obj-2-29',
    value: '1',
    label:
      "Defendant provided plaintiff with a declaration under penalty of perjury for the Centers for Disease Control and Prevention's temporary halt in evictions to prevent further spread of COVID-19 (85 Federal Register 55292 at 55297), and plaintiff's reason for termination of the tenancy is one that the temporary halt in evictions applies to.",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li1[0].Check35[0]',
    id: 'pdf-obj-2-30',
    value: '1',
    label:
      'Plaintiff received or has a pending application for rental assistance from a governmental rental assistance program or some other source relating to the amount claimed in the notice to pay rent or quit. (Health & Safety Code,  sections 50897.1(d)(2)(B) and 50897.3(e)(2).)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li2[0].Check35[0]',
    id: 'pdf-obj-2-31',
    value: '1',
    label:
      'Plaintiff received or has a pending application for rental assistance from a governmental rental assistance program or some other source for rent accruing since the notice to pay rent or quit. (Health & Safety Code, sections 50897.1(d)(2)(B) and 50897.3(e)(2).)',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page4[0].PxCaption[0].CaseNumber[0].CaseNumber[0]',
    id: 'pdf-obj-3-4',
    value: '',
    label: 'CASE NUMBER:',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page4[0].PxCaption[0].TitlePartyName[0].Party1[0]',
    id: 'pdf-obj-3-5',
    value: '',
    label: 'PLAINTIFF',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page4[0].PxCaption[0].TitlePartyName[0].Party2[0]',
    id: 'pdf-obj-3-6',
    value: '',
    label: 'DEFENDANT',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Liq[0].Check39[0]',
    id: 'pdf-obj-3-7',
    value: '1',
    label:
      'Plaintiff violated the COVID-19 Tenant Relief Act (Code Civil Procedure, section 1179.01 et seq.) or a local COVID-19  related ordinance regarding evictions in some other way (briefly state facts describing this in item 3w).',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Lir[0].Check39[0]',
    id: 'pdf-obj-3-8',
    value: '1',
    label:
      "The property is covered by the federal CARES Act and the plaintiff did not provide 30 days' notice to vacate.",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Lis[0].Check42[0]',
    id: 'pdf-obj-3-9',
    value: '1',
    label:
      'Plaintiff improperly applied payments made by defendant  in a tenancy that was in existence between March 1, 2020, and September 30, 2021 (Code Civil Procedure, section 1179.04.5), as follows (check all that apply):',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li1[0].Check43[0]',
    id: 'pdf-obj-3-10',
    value: '1',
    label:
      'Plaintiff applied a security deposit to rent, or other financial obligations due, without tenants written agreement.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li2[0].Check44[0]',
    id: 'pdf-obj-3-11',
    value: '1',
    label:
      'Plaintiff applied a monthly rental payment to rent or other financial obligations that were due between March 1, 2020, and September 30, 2021, other than to the prospective months rent, without tenants written agreement.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Lit[0].Check45[0]',
    id: 'pdf-obj-3-12',
    value: '1',
    label:
      'Plaintiff refused to accept payment from a third party for rent due. (Civil Code, section 1947.3; Governmental Code, section 12955.)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Liu[0].CheckBox19[0]',
    id: 'pdf-obj-3-13',
    value: '1',
    label:
      'Defendant has a disability and plaintiff refused to provide a reasonable accommodation that was requested.  )(Cal. Code Regs., tit. 2,  12176(c).)',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Liv[0].Check45[0]',
    id: 'pdf-obj-3-14',
    value: '1',
    label: 'Other defenses and objections are stated in item 3w.',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page4[0].List3[0].Liw[0].FillField9[0]',
    id: 'pdf-obj-3-15',
    label:
      'Provide facts for each item checked above, either here, or, if more room needed, on form MC-025',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Liw[0].Check46[0]',
    id: 'pdf-obj-3-16',
    value: '1',
    label:
      'Description of facts or defenses are on form MC-025, titled as Attachment 3w.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List3[0].Li3[0].Check35[0]',
    id: 'pdf-obj-3-17',
    value: '1',
    label:
      "Plaintiff's demand for possession is based only on late fees for defendant's failure to provide landlord payment within 15 days of receiving governmental rental assistance. (Health & Safety Code, section 50897.1(e)(2)(B).)",
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List4[0].Lia[0].Check47[0]',
    id: 'pdf-obj-3-18',
    value: '1',
    label: 'Defendant vacated the premises on',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page4[0].List4[0].Lia[0].Date2[0]',
    id: 'pdf-obj-3-19',
    value: '',
    label: 'date',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List4[0].Lib[0].Check48[0]',
    id: 'pdf-obj-3-20',
    value: '1',
    label:
      'The fair rental value of the premises alleged in the complaint is excessive (explain below or, if more room needed, on form MC-025):',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List4[0].Lib[0].Check49[0]',
    id: 'pdf-obj-3-21',
    value: '1',
    label: 'Explanation is on form MC-025, titled as Attachment 4b.',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page4[0].List4[0].Lib[0].FillField10[0]',
    id: 'pdf-obj-3-22',
    label: 'explain',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List4[0].Lic[0].Check50[0]',
    id: 'pdf-obj-3-23',
    value: '1',
    label: 'Other (specify below or, if more room needed, on form MC-025):',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List4[0].Lic[0].Check51[0]',
    id: 'pdf-obj-3-24',
    value: '1',
    label: 'Other statements are on form MC-025, titled as Attachment 4c.',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page4[0].List4[0].Lic[0].FillField11[0]',
    id: 'pdf-obj-3-25',
    label: 'other specify',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List5[0].Lic[0].Check52[0]',
    id: 'pdf-obj-3-26',
    value: '1',
    label: 'reasonable attorney fees.',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page4[0].List5[0].Lid[0].Check53[0]',
    id: 'pdf-obj-3-27',
    value: '1',
    label:
      'that plaintiff be ordered to (1) make repairs and correct the conditions that constitute a breach of the warranty to provide  habitable premises and (2) reduce the monthly rent to a reasonable rental value until the conditions are corrected.',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].PxCaption[0].CaseNumber[0].CaseNumber[0]',
    id: 'pdf-obj-4-6',
    value: '',
    label: 'CASE NUMBER:',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].PxCaption[0].TitlePartyName[0].Party1[0]',
    id: 'pdf-obj-4-7',
    value: '',
    label: 'PLAINTIFF',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].PxCaption[0].TitlePartyName[0].Party2[0]',
    id: 'pdf-obj-4-8',
    value: '',
    label: 'DEFENDANT',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page5[0].List5[0].Lie[0].Check54[0]',
    id: 'pdf-obj-4-9',
    value: '1',
    label: 'Other (specify below or on form MC-025):',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page5[0].List5[0].Lie[0].Check55[0]',
    id: 'pdf-obj-4-10',
    value: '1',
    label:
      'All other requests are stated on form MC-025, titled as Attachment 5e.',
  },
  {
    tag: 'textarea',
    name: 'UD-105[0].Page5[0].List5[0].Lie[0].FillField12[0]',
    id: 'pdf-obj-4-11',
    label: 'other specify',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].List6[0].item6[0].FillPages1[0]',
    id: 'pdf-obj-4-12',
    value: '',
    label: 'Number of pages attached',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[0]',
    id: 'pdf-obj-4-13',
    value: '1',
    label: 'did not',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[1]',
    id: 'pdf-obj-4-14',
    value: '2',
    label: 'did',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Lia[0].AsstName[0]',
    id: 'pdf-obj-4-15',
    value: '',
    label: "Assistant's name",
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Lib[0].PhoneNum[0]',
    id: 'pdf-obj-4-16',
    value: '',
    label: 'Telephone number',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Lic[0].Address[0]',
    id: 'pdf-obj-4-17',
    value: '',
    label: 'Street address city and zip code',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Lid[0].RegCounty[0]',
    id: 'pdf-obj-4-18',
    value: '',
    label: 'County of registration',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Lie[0].RegNo[0]',
    id: 'pdf-obj-4-19',
    value: '',
    label: 'Registration number',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Lif[0].RegExp[0]',
    id: 'pdf-obj-4-20',
    value: '',
    label: 'Expiration date',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].Sign[0].PrintName1[0]',
    id: 'pdf-obj-4-21',
    value: '',
    label: 'Type or print name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].Sign[0].PrintName2[0]',
    id: 'pdf-obj-4-22',
    value: '',
    label: 'Type or print name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].UDAssistant[0].Sign[0].PrintName11[0]',
    id: 'pdf-obj-4-23',
    value: '',
    label: 'Type or print name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].Verification[0].Date3[0]',
    id: 'pdf-obj-4-24',
    value: '',
    label: 'Date',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].Verification[0].PrintName3[0]',
    id: 'pdf-obj-4-25',
    value: '',
    label: 'Type or print name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].Verification[0].Date4[0]',
    id: 'pdf-obj-4-26',
    value: '',
    label: 'Date',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].Verification[0].PrintName4[0]',
    id: 'pdf-obj-4-27',
    value: '',
    label: 'Type or print name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].Verification[0].Date5[0]',
    id: 'pdf-obj-4-28',
    value: '',
    label: 'Date',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'UD-105[0].Page5[0].Verification[0].PrintName5[0]',
    id: 'pdf-obj-4-29',
    value: '',
    label: 'Type or print name',
  },
];
