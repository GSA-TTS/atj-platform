import { describe, expect, it } from 'vitest';

import { getDocumentFieldData } from '..';
import { loadSamplePDF } from './sample-data';

describe('PDF form field extraction', () => {
  it('extracts data from California UD-105 form', async () => {
    const pdfBytes = await loadSamplePDF('ca-unlawful-detainer/ud105.pdf');
    const fields = await getDocumentFieldData(pdfBytes);
    expect(fields).toEqual({
      'UD-105[0].Page4[0].List4[0].Lia[0].Check47[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List4[0].Lia[0].Check47[0]',
        label: 'UD-105[0].Page4[0].List4[0].Lia[0].Check47[0]',
        value: true,
        required: false,
      },
      'UD-105[0].Page4[0].List4[0].Lib[0].Check48[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List4[0].Lib[0].Check48[0]',
        label: 'UD-105[0].Page4[0].List4[0].Lib[0].Check48[0]',
        value: true,
        required: false,
      },
      'UD-105[0].Page1[0].List2[0].Lia[0].Check1[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page1[0].List2[0].Lia[0].Check1[0]',
        label: 'UD-105[0].Page1[0].List2[0].Lia[0].Check1[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page1[0].List2[0].Lib[0].Check2[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page1[0].List2[0].Lib[0].Check2[0]',
        label: 'UD-105[0].Page1[0].List2[0].Lib[0].Check2[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lia[0].Check3[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lia[0].Check3[0]',
          label:
            'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lia[0].Check3[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lib[0].Check4[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lib[0].Check4[0]',
          label:
            'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lib[0].Check4[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lia[0].Check5[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lia[0].Check5[0]',
          label:
            'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lia[0].Check5[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lib[0].Check5[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lib[0].Check5[0]',
          label:
            'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lib[0].Check5[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lic[0].Check6[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lic[0].Check6[0]',
          label:
            'UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lic[0].Check6[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page2[0].List2[0].Lib[0].Sublib[0].Li2[0].Subitem2[0].Lid[0].Check7[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page2[0].List2[0].Lib[0].Sublib[0].Li2[0].Subitem2[0].Lid[0].Check7[0]',
          label:
            'UD-105[0].Page2[0].List2[0].Lib[0].Sublib[0].Li2[0].Subitem2[0].Lid[0].Check7[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page2[0].List3[0].Lia[0].Check8[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lia[0].Check8[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lia[0].Check8[0]',
        value: true,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lib[0].Check9[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lib[0].Check9[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lib[0].Check9[0]',
        value: true,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lic[0].Check10[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lic[0].Check10[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lic[0].Check10[0]',
        value: true,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lid[0].Check11[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lid[0].Check11[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lid[0].Check11[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lie[0].Check12[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lie[0].Check12[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lie[0].Check12[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lif[0].Check13[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lif[0].Check13[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lif[0].Check13[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lig[0].Check14[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lig[0].Check14[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lig[0].Check14[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lih[0].Check15[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lih[0].Check15[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lih[0].Check15[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li1[0].Check16[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li1[0].Check16[0]',
        label:
          'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li1[0].Check16[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li2[0].Check17[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li2[0].Check17[0]',
        label:
          'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li2[0].Check17[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li3[0].Check18[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li3[0].Check18[0]',
        label:
          'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li3[0].Check18[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li4[0].Check19[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li4[0].Check19[0]',
        label:
          'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li4[0].Check19[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li5[0].Check20[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li5[0].Check20[0]',
        label:
          'UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li5[0].Check20[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lii[0].Check21[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lii[0].Check21[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lii[0].Check21[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lij[0].Check22[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lij[0].Check22[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lij[0].Check22[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lik[0].Check23[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lik[0].Check23[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lik[0].Check23[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lil[0].Check24[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lil[0].Check24[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lil[0].Check24[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lim[0].Check25[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lim[0].Check25[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lim[0].Check25[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li1[0].Check26[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li1[0].Check26[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li1[0].Check26[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li2[0].Check27[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li2[0].Check27[0]',
        label: 'UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li2[0].Check27[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li3[0].Check28[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li3[0].Check28[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li3[0].Check28[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li4[0].Check29[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li4[0].Check29[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li4[0].Check29[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li5[0].Check30[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li5[0].Check30[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li5[0].Check30[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lia[0].Check31[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lia[0].Check31[0]',
          label:
            'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lia[0].Check31[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lib[0].Check32[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lib[0].Check32[0]',
          label:
            'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lib[0].Check32[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lic[0].Check33[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lic[0].Check33[0]',
          label:
            'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lic[0].Check33[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lid[0].Check34[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lid[0].Check34[0]',
          label:
            'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lid[0].Check34[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li7[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li7[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li7[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lin[0].Check36[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lin[0].Check36[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lin[0].Check36[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lia[0].CheckBox190[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lia[0].CheckBox190[0]',
          label:
            'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lia[0].CheckBox190[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lib[0].CheckBox192[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lib[0].CheckBox192[0]',
          label:
            'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lib[0].CheckBox192[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li2[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li2[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li2[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lio[0].Check37[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lio[0].Check37[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lio[0].Check37[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li1[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li1[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li1[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li2[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li2[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li2[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lia[0].Check32[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lia[0].Check32[0]',
          label:
            'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lia[0].Check32[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lib[0].Check33[0]':
        {
          type: 'CheckBox',
          name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lib[0].Check33[0]',
          label:
            'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lib[0].Check33[0]',
          value: false,
          required: false,
        },
      'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li4[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li4[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li4[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li5[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li5[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li5[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lip[0].Check38[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lip[0].Check38[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lip[0].Check38[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li1[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li1[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li1[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li2[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li2[0].Check35[0]',
        label: 'UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li2[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Liq[0].Check39[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Liq[0].Check39[0]',
        label: 'UD-105[0].Page4[0].List3[0].Liq[0].Check39[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Lir[0].Check39[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Lir[0].Check39[0]',
        label: 'UD-105[0].Page4[0].List3[0].Lir[0].Check39[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Lis[0].Check42[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Lis[0].Check42[0]',
        label: 'UD-105[0].Page4[0].List3[0].Lis[0].Check42[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li1[0].Check43[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li1[0].Check43[0]',
        label: 'UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li1[0].Check43[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li2[0].Check44[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li2[0].Check44[0]',
        label: 'UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li2[0].Check44[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Lit[0].Check45[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Lit[0].Check45[0]',
        label: 'UD-105[0].Page4[0].List3[0].Lit[0].Check45[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Liu[0].CheckBox19[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Liu[0].CheckBox19[0]',
        label: 'UD-105[0].Page4[0].List3[0].Liu[0].CheckBox19[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Liv[0].Check45[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Liv[0].Check45[0]',
        label: 'UD-105[0].Page4[0].List3[0].Liv[0].Check45[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Liw[0].Check46[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Liw[0].Check46[0]',
        label: 'UD-105[0].Page4[0].List3[0].Liw[0].Check46[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List3[0].Li3[0].Check35[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List3[0].Li3[0].Check35[0]',
        label: 'UD-105[0].Page4[0].List3[0].Li3[0].Check35[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List4[0].Lib[0].Check49[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List4[0].Lib[0].Check49[0]',
        label: 'UD-105[0].Page4[0].List4[0].Lib[0].Check49[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List4[0].Lic[0].Check50[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List4[0].Lic[0].Check50[0]',
        label: 'UD-105[0].Page4[0].List4[0].Lic[0].Check50[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List4[0].Lic[0].Check51[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List4[0].Lic[0].Check51[0]',
        label: 'UD-105[0].Page4[0].List4[0].Lic[0].Check51[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List5[0].Lic[0].Check52[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List5[0].Lic[0].Check52[0]',
        label: 'UD-105[0].Page4[0].List5[0].Lic[0].Check52[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page4[0].List5[0].Lid[0].Check53[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page4[0].List5[0].Lid[0].Check53[0]',
        label: 'UD-105[0].Page4[0].List5[0].Lid[0].Check53[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page5[0].List5[0].Lie[0].Check54[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page5[0].List5[0].Lie[0].Check54[0]',
        label: 'UD-105[0].Page5[0].List5[0].Lie[0].Check54[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page5[0].List5[0].Lie[0].Check55[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page5[0].List5[0].Lie[0].Check55[0]',
        label: 'UD-105[0].Page5[0].List5[0].Lie[0].Check55[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[0]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[0]',
        label: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[0]',
        value: false,
        required: false,
      },
      'UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[1]': {
        type: 'CheckBox',
        name: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[1]',
        label: 'UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[1]',
        value: false,
        required: false,
      },
    });
  });
});
