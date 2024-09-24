const passwordInput = document.getElementById('password-input');
const submitButton = document.getElementById('submit-button');
const imageContainer = document.querySelector('.image-container');

let currentAudio = null;

const passwords = {
  'саша': {
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABvFBMVEUB/wb/oQOambhjYmgAAAD+/tzGw9T/nwP/ogOamreZmrj8oQP/nQP/pAD/nAOAfY7/pwD8/+r//+HUAgNlZGignb3//+dmZW2emrv399XGxNLV1+b4ogMAABD//+Oen7qTAACXk6uGhJlDQkinygZG7gWYzwaB1wW9fwDikQCNiaAmFAB2TwBYVmKscgBkYXNwbIU9JgBNS1ShygUlJScZGhg+PjtZWVkyMjFHR0ZRUU/xogZzcYPjqQW1tseaZwB7AACPWwCL1QZ7en/OtQhp5ArBwAXKuwbdrgXZswe3wgRS6gPKtgYo9AXrpwZ33QTTixGOZRqychYrHgBoSAAVHCleVms3PkQAEi0TCgBYOQDbkgfAgholJCtNT2MmKUIlLz8AGyhUX3aBVAA1Ok4bFQBvcF8kNUHh5MaUlIO/w6nIhwAACSlqZYCpqpZ9fWxYVkyusJEvMVFHU217e5tXRCGxrqIzLCXT1MfIjT2ig19oPwehhHQQFCU6Oy43IgCJjsKSelekoqweLDCMi5AXAABWBgZxX1I2AACgeUZiBwkmAACEdm+GBgi9BgqGa0ZEOEA1AAxKOiEOGhnamDmmAAAYtElEQVR4nO1djVsTV7q/SQ7OTE7mY3GOM4YJMRPAJBICkZAAAYoooshHK4qCIApaxFXpLV132+32LlqvtbW3u/cfvudMvibJfGSSCeh98nse2TUN4/nN+573e878x3900EEHHXTQQQcddNBBBx100EEHHXTQQQcdfDJYunZxoG/++o2FhSmMhRtXr9+8fGVlcem01+UGFi/23VrmMAKBAFUB/lsAf0gtzA9c+3x5Ll3rW1AwNQrSHspjCIjJcnB5/kr/aS/WORYvL2AhUdADMcwZQvwFD4W/OTl/8XOS5bV5BYvOmJQJCMuFgc+D5OLNyQCWjiN+hCLloQOBhU9fklemuABWPjO1NAdN7gr0cMr84mlzsMDiPOVQOY2EyS1fPG0iJli82jo9j2Z9OOVT3JGLC9hyQsfbrx4KuQwH+06bUA0Wb3BuyE+HADVw2qR06L+F3bq7BD0wwCmfzH7sC1CKG/pZRRDvR4qb+iTs6gpxf+0CN3/qJmfpFtc+fkSOysrpElxR2shP8xyQu3WaYmyrAEug4KmJcbGdO1AHyN08HYIDFKV42qulRYZKYOo0NPVENLQEOnDtpPktTZ0gP2JyuBMOcRaxHT9Jhng7nOxmXHE7Cm0AkLpxcgSvuB6FNgCFok7M3gxwp0CQUAwsnwzFPlMjSkM4qbSRPVQmT6Ls2GclQXqVbh9BnDQqk+2X4mUOWnh59rnSRhtEKlxtp3jZys9DRYnF27tHYbuleMUqEqWVmQczX062VU8pD7XQTorXLCM1dkZhVze/YtvJECpt9YuL1nsMM4Qz7BALsXcmukpRbdmTFHW9XQSXbLIlWnkwFGe/EmiaZtu5GyF3uU0MF+y6ETRkhdUhJY4BBQy2LVsSW1SuPZnGTZt8F2KGq4OghNtrs9iwCqzWQHObpKcdnn/FJh+EkF4dAXfu5hMRjIQ6/GL9Xuj+xswmZCm3lZaCy+4T7Ic2KkcJD8CWGkay3yt7vV4ZIRT2qi/WwaXdTbf1VfG0IZdatqv50nGQRshbA0xT3Q7dHvJgMbqakXBul6f6AnYtQWHwIZKZWoZerx/Jcn7nUgzSrqoqBd11/IucxyZpoBWgyvX8MEOvl5ERf29j0tVQAHquuspw2fofgzQrxH6sU1G9tiaSYJWl3DSrnJuNmz5LR4G9oBLbuJO2YuiNqFEQE1zVVMo9Pe3nzO89lh6LveB24uhu2IIg45XDR3u7z1kXzaqL0duCoZHBYT5LC3B1FzxMYd/AJy1lqKmq9/HOWizOsjiqc6FfDF0LbS4a+3oIWfh8EDxKJcLYB3oT1lpa5CgnHu+MzMYmaZalWhUmpNzy+5NGl8faubkL7qUS2AdqNjSyXtRSmXjFes9I4Nf+ayK/BwjLVgNXSuGuuELwcqC2bEFh26kMPbl3F0uvIp4oYRrGVjN9+PTp4d2Ioe8o3oKwmvo6BAaH4h5sfEhxuTmVpRQ3jM0SV7djBBjfBXuqrOOHhZZSidxQ6ul+97ne7v1XKcMAoCRMFI4kXqz/+GRtaJPGLJvsYgXcGNm4GahhSAvxtdCLCGK8ZQJ+lBjOqyminS+enevq7uo696c/HWybb0zyuzLDIH8ivw1uN29ioQuRzRKsviIU4oN/Hg4jP4amb2HERF48fXlw8HLiKOxPvML0NIKYYtJUUfWyx3dnJ7QWw4kWMR7OGLrRzajOCiHLzoQwP0ZbG5PIJ9e3MmDsoLe7q7u792UKRc93lRme+2a4AfOK96WMIkd7mbVVj+CUIqS5VoW4VF3/ZOMj2zJiGL+M5Hw0BMDoejqaxfvunMbr5fazrooMe7uzpkJERHhFjcWXCzPIe7R3aTYuOAteIWx5J14OVLQUKsLQoyNEzARS0wBkxrPihOgb7+3GhHoJsd7D/W5CsZt8gj/a39YZG4YpaiW2MarK5/N5Xk0kIvgD7T74/YjJ31tb1aoCjaNlc6r/xyA7+7WMnV6YSW0BMJYVMbuklNvv6iUS07Tz4C/d3ZoQu3t7MefuLHGBFWVEERXr9WimCK3akdlJ5iOMLBO7hcKJvQ0coDvh2GLr9CKnS5rg4HZYZkiWAHJZ0Sf6fNkxMf2su6CThf339Nz+078Shtpfu745KuupH6nSH7mxiSz+VUmSRPJHzGYnxnOY6VY6j4WJ0yzsTvdGNgUnQmwtsKlEpJASBh8jGSWiAIz7JJ+GMZ+IRdjVTcwKoXXu3LN9LJaCtSHYv1tiqOZTqgp8BsBEJ8YIS0nFuxvnkpH/HJx0oKotZfv9uohUGPoWb791kEkT6RXWlvP5nhKNxEIkQtsfO3j2EmR+e9ldYng+WgzlIkQR1ftGDH34eviOTeSwxiZV7CO94aPRGNuoUVUCraTCOlcB4+sosU7UU6osDSvpS00hNUq9WXD47BmWYYVh12HRYGLnych8RjSmqNHEOktEmcaSDKPtQbvKV5khbMVhTFZuJPsdTmGr+YnjE2LuoEymqxcL4dVfss/AgY5hxUEwKJUzJ1iiOT4KQFJF4aPXcQPHYai6geZtzUqlGUrHQ5lxfJur1oM/2NqvbLruV3/NvDr/l7/+o0Jaz9CL0uN2DDVRYpIZKcJE6ynSxonqVNMMb1Xqf7SSEX1SzWrGRemOjmHX/suDV9373/SWPzjfNa5nuJW1Z6ixzE68Buv5rXi1otIPTCrLXNMVcP1MibBWtzwRfzJ6oGPY3f3ysLeroqJd58/ndHFb5H7tLTKHhO3rnTWhiiL9t03jiKfpTk3V1Ay7ulN/r32+6MvzOopdE3v7ur91nT/YqzBEedttWHVxMRkSPNUUv48bm59m1XS+qs7A/pA0WEf2sKvCsPebF4nDczqCXa+G/bptOOGEoU+UQjWen/7b342FGGhSTSf1+xp64j8a2HoR7JeF2L2/hdCezhmePw90OTCTcUTQJyZv1zBklTlDhs0OvS1WFaCgwg59Xb+PxPF/nC9S7N7PYZ/HhA56SwS7nqbkZpUUXzo9K3hqslMThlRzTn+Aqr66RxhM11EUo9uH54midp87yCSQn0GRgjskvJ+Fwt5ImWGuQUtavvToTzPV2RS9+ZsxQ8g1xfBG7a6mlJFsjUf0ZZMoCV7u7+8fHD4smczQoWZu9g9/lBNSiSGjgtxErUO1RDaT/DPYeM7SHi1Gxbkx+/3fTAKdpiqnS3WDQZCaDPmqlyhG1VQqSpKgPbVsNZkkeH14mAPRfDqP/KWAZp3HOdeYA4q5FI5s9sBITCi4ZYp+8JtZOB5oxl8s1pW/oEKvPqpaoSTmwojB+WyCCculZBdnB95U9E5oazvPIKbIEPEpnJjwAGQbpCj6QMRLkqk02CDBDU2zD9RNs1i1qY04EDC4HDv0SEzp1pidMK7EoAJ03j5Fkgw5MgrGG6IoSrlClwDnazkwo8B4/O//9cBjynCyCYbzRjEgJcx8rV9h1mdWiWGYqmJpUcByBIDGvGIWFErp+PfkYfD6N97r/ydrPqDTTOA2aRjIQ2FtXb8O6Uy4gZIhgV/7I2NFbYRgSYRaaRVh0c/x+bjHPC1upploNnohbFT0TBJ9Z86cmbZqq9UijHOwBghmQUT/WygNJJN4psjQeclt0XS4BI4kyxZVzAXPEI6NM5RVAOx3ophJVW9wJIEZy5TY+bCbSUuN+AzlTrLk+aXcNCYYdCBEf7gBYyNOZKp/i2GQ9LNiJUTn9SiLxjYbHy25NTFzTAjab0W5XFZEKTBqK0TA18+tpG5bdFWh87LpdYtKEL15p5ANi9G3WIT2EmQikZJjZOSEra0Rx3L112Tk9V0LITo3pjcsGEJ29ZHGMCsGNRU17aIVoKZ8fDl68yLs9u1EmKjXClmWQ89Nt2ITHe9ly2qeEHtDKEY1I8No3q+Aenqk78tLuiWjHJiwVFMxZzIScHRf8ZgMLkHH7eAlm4IsO/RGEtPHREdtBIh9YEKK6hkmbUwNdvbGQHdnBbMzRBx3aJbsJhHZoR1xHOso9hbT09PhEupvPpYhn8QMyzcCm5oxq7qpL5NHxneNYUJm9hRS8w4Z9ts+eyd89XDuTAnBAvD/qXONjOzlc1JC9wkPchYMpXEDM1OAjFKzJi0N56PR5g6/DHbm+Ew9DFaX4EFez1C1ZIjNjNF2Ltws+YlJC9X5fLvdvCwGHZuu42cUwDGqNMrrGSasHKL0OoXMGPoZ9G3MWE0px2Xhi/bDEezMdHA6WGEXNPGMMlZSXj+3aMVQmtiy7IwfrRmrKfQ4zZ+uNKKl02+rCE4b3nomkceJgZ5hxJyhKIKIpW1GOcXEJ0KHDAcaYSjW7EDGyPUzpKPD8w0yJHbUKgZE26vGauq4GDVgr6VwVr8PjdML7Coi+Z/fgbSqG5GKmFoaccxuOI4ZnjGevKHawJD9b70AzXSLUde/uPAOG9MGGIoTo3YBoJww2Yge9xnS8bcVAcomK5OZiPT+woWPv+bUyocJM4Yk7fUbXqdywyI/CcYb0SlDe0tDrxYMqZkJLYIPXcD4AkiJ8rcSIGpM8L5qP2HEPHJJhvbegv2qsA2D0xa5hRzBOkrw/g++/CUVpI2tTH1SWAe/954JQ8V9hr8Q8WGCsoViIaKjGB9+1oU1PDDqYomm4WiVCNFDxagTDB3XE6/ZM/xnaQuaCtCL1F8LBMF7kFSL60d5owyYELTlpzE06SEuOGRoH5eyvxUYkhDLJBXwejMawY+h389+eFNKgnH2VG9oGiSIL3rPkKHz9pN9bsH+Vgxops2qiXL4zcfCJvx49uzvgC86DJTO1LWwsqDc4bBjGDIcyoaOcwu7/NBD69xhfcqkIVy0Mhd+PYsBpGLkhnK1zkKaMKg8GcPvBSaWxvGgqd3BMzT7P2fKUakBQ8aL/igS/HCBMHyX5gv/BdUmwOLYVqJBgsTVCIaFDOfTClM2U1c0+2WJYdDQITI74J22CX8FvxOGX6wX/QWqLtNI2fvRsJ2jL0MeHjGM2qDzsr5VrU1jKFTC0rqkwu+XI/dGNjeIJf354zuN4cc3mgwZOVLdYRsDDdqYwu25O2ispc6P6Jm3cRc0O1RO8esrwogHswoN195hEZ79/SNheKHEUK0wFH3jIBpBDfZ2tAvfmTFudDsfx7ALTGk2zpdE6K/RMcTs3cZJjuJRLn384gO2owUZapaGQWpJSyVxDGRUZJhzmUEGJtmT86MW7MsYykTwzHGtmSG9MPnbkVhhwoB9/q+PH84W8CFXCGpkUqaRJDE7Pgq28sbP1pjCnwfGGXATc7T9tscIsd+deXtcF3cz8uONVU9pOlT47sK7IsP36YLHlxkAMrlRAEBUDVtFfEZA6Q2TbdjEc2z2DIekt8QXVi1S9t7B8qNLLRR66MP7AsHfgVQYWCeNMox0PhI2y7ksGALjbdjUqMKU3YPJSnyd7EK9DuFA9HbVzCRU3he84dkPlYdow0zCixyqpwZGzgOTYYVmxk1u2p2VxH4Vqa2PypEn1dsEshsf3xVEmI6UhzW8DoxnFcI7IybT0c3MCV+0Zag5RH3YzYTvbVY/BwvpB//ShPge8NiFFL/nd6qcpRuogiHjEdOmBvb7bRl+iRkGq1bworboTtPCv9+9v3D2HZB4JmL+CE01TPwHE/4DmKypuQdmJxtiWKWlmbrxc+w2fyKGJcnz6hhv/kxiA4gwCWB2+E2gqUctb1kTJBXham/oH65r0lJk9Pbr3LrE83xU4g0an4bCShjIUFbRzk9mN725OWi7YhQbOy4WgkvJ+07c6GuzmB2v8r40/h+mIf/HpFQj2imwaczQeQmjALskGMbVQmJRbqT8ZKRD7FqeUIwClTBsTIZqvv5OyAlsZkyW4rh5WIRNAgU9TwtxaXHZ8tGuYHCP6djDlLT3XQz4MMNE3cINETFoczPeQcHMRQeafDDopvUhD5BsxGAleUKPjR/lYTeHhuICnAFElrLcQCoY9hoV92WTcKaFZ2UXLY5SwKBYOFwsKGr3GO3FjZwVBSlywgAlbISwvcE2xJ4hI+fqGcqRQVMlbfr0r0nLwA0v+odi1ZsIUZbvCMYTPYURX1q5TaQYacTYyKMGDL3fmT2015yvILgZsHaJ9Ga+2DkkS4jUjtbXEp28RBqJ9vywuDL1HzLeR0bbnKD5R7sWOZt6FLsxXeod4nts1hUqMWRnQWMU5cRovUmSw/dMjvNrclJfg/XYEHEYe+Vyopw3tQQlhkPJHFZU44N6qsDn+LrTChj54arxhVs5qOay3QFm7NpcoeKGDcgLm5M9IR3bU5M4QFW9lk5DRiq/btDDQDsx2kCnIHTa39bDti5MxR8Gi2qKtk0aChWGqzs8n8/hEDVqfVgP/oIRw70ZI1vd4qEDVhOK2uWFJ8FiTRit2zCk6Pg9Et1IPmuGjBbDGhwbtrdrvNFbekXEImdzABa7W6wpetFrm+daaY8C+AKiNVtR70AS2heSKE/q4Ph7Ze+CtteMZAidNp1qMGVzrgoby2tOX2No+U0MocywVkCMXACj8ePV9RR/PJYgTfLyYxxmVahWD267aFOQoqFWrMFpoj1DmtUCN02G1W5f5hMYqqpqWYiUTIPkcU9wC6nZubQslxn+ZGBoWj9naNlm3ULBJTJeuREZSsYyDB/l5yTJl01HRwHIicdibr2npyebmOvpCZZCVAaln9T9C9CFY4Zss0Rtfg8H32HTaSUdQ59GcK42sEZ5Uge4dBvMvQ1OYG7HIE1+po7xz7dq6UvR+3U7XQk0lxlWYdJGTeOPCzIM79nYUsIwqTH03a1lOByLxxW4CTCjuSAWHMDS6+nZIgx7is8lyGgd1DF0PhpsLERL9WNHgoV9aOcPPXSJYbLmYQqvfzjG0rRnEhwXGB6Dt4RbTmM4V7Q1TOhJfWTvymlflicKeqAwexwkYZv8OGbn8UsMo3lvLUOSvkN2cyOzvs4fHyeBxi2r/ZwudN/CKVDvLdw5WXDFOsNg40mNoX/YJi7FuwYzJEW3TKI2g8rPstohtgKMzczuzu6CaU16GsOeNIlvUAqE4rUybOGsgSosWBtJ4RIZjmK8iUE7LY2DtBicy/MgkohovrzUlkPlKh1NsywrKCAaJEamwHAugpC6A36os2SKW4fu2UyesDPE6YcZ72uzQfrSF2NgDC/Yl99Sj9M1lqa6s8uuXgJv5o5FbTcGxReP74G11ToVhdC1Az6tz0imlcyZIFZTtKdYHrlC8kMilLkktiDTScRUptjQ8A96hpBi2dXZJ9oRRCH8Z2N2lRLoOjMDXTz80jo4xULEFBls8i0P76TZQeINet5mxvHPqFc8TpcepEGpuoCMxrq6uYpBDs5mDacT3Hz1zIp1D0O5RB4OkpkfLM98poRdEqkUXcE4TxS22BNASYOQk7yElsDsmm6ZmQKuWukppJ9va/nTt5YvRsAZcFozHPeJFRknNN+WZLhnwJDSnvo1vyLn6ov1lhSLJ1SxOcU5VHB6b3fT2tQIGxLRT6KkPRNkSx4XIzL0ZtDGStXzp1w+en6FszwLmt7AHmNMMH3WugCWHvr33NuMSBiOE48XLB4MIod2nTKkXdVRgvm6Mz71EOB3x8f/azKfXAYFiY0c+ZFoaa6nEnMiHnzlWIbunztvHbzR7Oxtk2mlmi8KwiDITveMagwlPzmgkMmYtedNgJOmNrzBs9+mOszSJHhuBOzmD+DR6DSRpEjy21TItPNpxpBrstlkDcsZIu0Y2YYYUiQE35zZHRz85Zdfvvz++192B3c3HR6b7K6jqMB2OqNxYH+O3XgRDk9nxXfDlcN1jXD15N+2ZgBItekFHgR2Vf4TAaTcOQHaEEvW/baToNfC2WUNof8k3sppyZCm2vwexAaenm0rKOpWewkSiif79ko9sBUNtJ0geW/XqW1FSLv82g5TiqcmxJYOY3WARfIi4BMHeYF1W2I1I/QbPpjTboaewAm+TbZ/+WTeV13F8ITfCHwj4PwQ/FboQfdf8GSHm4H2vPvPhGFg0tWqTEMwPUiqHeDa+uJKM/QvUy68DqcBwGbOKnMH81xb3zlahnLiL1Yvo4HzQVoGxV09DQ0tYelqgORTbbM55PWQbcwGG8LFyUCDBahmQAVOVYAFLF3nbArBzSMwedJO0BiLU/UvTGoVlAKVAHVaJrQeK5N2k6hOQaoV86evoDoMwICr5obibpx8EGODgWWbsZQGQcxngLv1yfHDWLqyzFF0y4aVMLz+KfLTcO1Gy/k/xSl9n9T+q8VS3zJHggDH+gq1dz8HuBufhn+wxLV5hXNeOFZwfM1NDXzS4tNhZR5yjmwrFQhwCwPteNl2+7A4cBVyFM6SIWWWZOGPiayx5eSm5lc+F+lVYXHg+rLCEZ6EYcHMlo0tZk7RAS6gTN38PNmVsHTtys2ryxxBgADzwj+1v8OF630rn5dmWqH/2srFKwOX+zAuD1y5eG3xs5ZbBx100EEHHXTQQQcddNBBBx100EEHHXTw/xH/ByQrlq6iOAYOAAAAAElFTkSuQmCC',
    music: '1726991660_kpbrsmsshdshjslnkfl.mp3',
    caption: 'я хуй знаю что писать короче пися'
  },
  'данил': {
    image: 'IMG20240924092236.jpg',
    music: 'Valve_Software_-_Soldier_of_Dance_Saundtrek_iz_igry_Team_Fortress_2_VIPMP3.BIZ_(SkySound.cc).mp3',
    caption: 'данил- это человек(наверное)'
  },
  'маруся': {
    image: '1000022767.jpg',
    music: 'Zvuk_koshki_-_Myau-myau-myau_poyot_Bot_(SkySound.cc).mp3',
    caption: 'маруся- это легенда мира и тиктока '
  },
  'аня': {
    image: 'data:image/jpeg;base64,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',
    music: 'Joji - Tick Tock.mp3',
    caption: 'аня- это то чувство когда мама учит миями'
  },

  'раиль': {
    image: 'IMG20240924092058.png',
    music: 'morgenshtern-chernyj-russkij-malchik-mp3.mp3',
    caption: 'раиль сори но песня подходит)'
  },

  'матвей': {
    image: 'IMG20240924120850.jpg',
    music: 'Попу мыть - Нужно каждый день.mp3',
    caption: 'зря я туда полез'
  },

  'андрей': {
    image: 'IMG20240924092136.jpg',
    music: 'David Bowie - Starman (2002 Remastered Version).mp3',
    caption: 'себя не похвалишь не кто не похвалит'
  },

  'максим': {
    image: '1000018870.jpg',
    music: 'n1v2rn42_p42t_61k4r_2v2n_c5t2_2rn2st_m2rk2l_d1_61_r5ssk3j_p4ln161_v2rs361.mp3',
    caption: 'видно патриот'
  },

  'секретка': {
    image: 'IMG_20240306_120425.jpg',
    music: '9a49e1c170bd8c1.mp3',
    caption: 'скырлы скырлы'
  },

  'снайпер': {
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTymuUxJssUdBQORkzwEwW5R9Ntb3fIhgaRXKgAnrXBUmF0LJKb',
    music: 'video_2024-09-24_20-54-04 (online-audio-converter.com).mp3',
    caption: 'это референс (педик)'
  },


  /////// список пополнится
};

submitButton.addEventListener('click', () => {
  const password = passwordInput.value.trim().toLowerCase();
  if (passwords[password]) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    const image = document.createElement('img');
    image.src = passwords[password].image;
    image.width = 500; // adjust this value to your liking
    image.height = 500; // adjust this value to your liking
    image.style.borderRadius = '10px'; // slightly rounded corner
    image.style.objectFit = 'cover'; // scale the image to cover the entire container
    const caption = document.createElement('p');
    caption.classList.add('caption');
    caption.textContent = passwords[password].caption;
    const audio = new Audio(passwords[password].music);
    audio.play();
    currentAudio = audio;
    imageContainer.innerHTML = ''; // Remove all existing content
    imageContainer.appendChild(image);
    imageContainer.appendChild(caption);
    imageContainer.style.display = 'flex';
    imageContainer.style.justifyContent = 'center';
    imageContainer.style.alignItems = 'center';
    imageContainer.style.flexDirection = 'column';
  } else {
    alert('Invalid password');
  }
});