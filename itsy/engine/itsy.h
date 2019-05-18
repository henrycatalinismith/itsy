#include <stdint.h>

#define TOUCH_0_B 0x4300
#define TOUCH_0_X 0x4301
#define TOUCH_0_Y 0x4302

#define DRAW_COLOR 0x5f25
#define DRAW_PRINT_X 0x5f26
#define DRAW_PRINT_Y 0x5f27
#define DRAW_CAMERA_X_LO 0x5f28
#define DRAW_CAMERA_X_HI 0x5f29
#define DRAW_CAMERA_Y_LO 0x5f2a
#define DRAW_CAMERA_Y_HI 0x5f2b
#define DRAW_LINE_X 0x5f3c
#define DRAW_LINE_Y 0x5f3e

extern uint8_t memory[0x8000];

// optimization!! e.g. sprite[20][30] contains the address in memory of the
// spritesheet pixel at x=20 and y=30, to speed up reads & writes!
extern uint16_t sprite[128][128];
extern uint16_t pixel[128][128];
