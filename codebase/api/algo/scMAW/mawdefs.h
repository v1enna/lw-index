/**
    MAW: Minimal Absent Words
    Copyright (C) 2014 Alice Heliou and Solon P. Pissis. 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

#include "sdsl-lite/bit_vectors.hpp"
#define ALLOC_SIZE              1048576
#define DEL                     '$'
#define DEL_STR                 "$"

#define DNA                     "ACGTN"                         //DNA alphabet
#define PROT                    "ARNDCQEGHILKMFPSTWYV"          //Proteins alphabet
#define IUPAC                   "ACGTUWSMKRYBDHVN"          	//IUPAC alphabet
#define SOLONmax(a,b) ((a) > (b)) ? (a) : (b)
#define SOLONmin(a,b) ((a) < (b)) ? (a) : (b)

using namespace sdsl;
using namespace std;

#ifdef _USE_64
typedef int64_t INT;
#endif

#ifdef _USE_32
typedef int32_t INT;
#endif

typedef tuple<INT,INT,INT,INT> mytuple;

struct TSwitch
 {
   char               * alphabet;
   char               * input_filename;
   char               * output_filename;
   unsigned int         k;
   unsigned int         K;
   unsigned int         c;
   unsigned int         total_length;
 };
 
struct TMaw
 {
   INT	letter;
   INT	pos;
   INT 	size;
 };

double gettime( void );
int decode_switches ( int argc, char * argv [], struct TSwitch * sw );
void usage ( void );
unsigned int RevComStr ( unsigned char * str, unsigned char * str2, INT iLen );
unsigned int compute_maw ( unsigned char * seq, unsigned char * seq_id, struct TSwitch sw, TMaw ** Occ, unsigned int * NOcc );
unsigned char Mapping( int a );
int RevMapping ( unsigned char b );
unsigned int LCParray ( unsigned char *text, INT n, INT * SA, INT * ISA, INT * LCP );
unsigned int maw_seq_comp ( unsigned char * X, TMaw * mawX, unsigned int * NmawX, unsigned char * Y, TMaw * mawY, unsigned int * NmawY, double * XY_distance );
unsigned int edit_distance ( unsigned char * x, unsigned char * y, double * XY_distance );

unsigned int GetBefore (
				unsigned char * seq,
                                INT n,
                                int sigma,
				INT * SA,
                                INT * LCP,
                                bit_vector * Before,
                                bit_vector * Beforelcp );
unsigned int GetMaws(
				unsigned char * seq,
				unsigned char * seq_id,
				INT * SA,
				INT n,
				int sigma,
				INT * LCP,
				bit_vector * Before,
				bit_vector * Beforelcp,
				unsigned int k,
				unsigned int K,
				char * out_file,
				TMaw ** Occ, unsigned int * NOcc );
