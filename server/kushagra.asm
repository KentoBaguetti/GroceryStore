section .data
    msg db 'Hello Kushagra', 0xA  ; Message to be printed with newline (0xA is newline character)
    len equ $ - msg               ; Calculate the length of the message

section .text
    global _start

_start:
    ; Write syscall (sys_write)
    mov eax, 4        ; syscall number for sys_write
    mov ebx, 1        ; file descriptor 1 (stdout)
    mov ecx, msg      ; address of the message to print
    mov edx, len      ; length of the message
    int 0x80          ; make syscall

    ; Exit syscall (sys_exit)
    mov eax, 1        ; syscall number for sys_exit
    xor ebx, ebx      ; exit status (0)
    int 0x80          ; make syscall
